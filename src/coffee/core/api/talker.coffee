BrowserMsgr = require "./#{ENV_BROWSER}.coffee"
api = require "./#{ENV_BROWSER}Api.coffee"
Ctor = require "../constructor.coffee"
ctor = new Ctor()

class Talker extends BrowserMsgr
  constructor: ->
    @cid = 1
    @api = api
    @ready = false
    @modules = {}
    @onReadyCbs = ctor.object()


  send: (msg, cb)->
    msg.host = window.document.location.hostname
    msg.url = window.document.location.href
    msg.isFrame = window isnt top
    super msg, cb


  sendAnswer: (message, sender, sendResponse)->
    return sendResponse(err: true, value: "Unauthorized")  unless @appId is sender

    unless @ready
      return @onReadyCbs["#{@appId}#{@cid++}"] = do (message, sender, sendResponse, @cid)=>
        return =>
          console.log cid
          @sendAnswer message, sender, sendResponse

    switch message.reason

      when "ping"
        sendResponse err: false, value: "pong"

      when "storage.set"
        @api.localStorage.set message.data.key, message.data.value
        sendResponse err: false

      when "storage.get"
        __value = @api.localStorage.get message.data.key
        sendResponse err: false, value: __value

      when "storage.clear"
        @api.localStorage.clear()
        sendResponse err: false

      when "ajax.get"
        @api.ajax.get message.data, (res)->
          sendResponse err: res.err, value: res.value

      when "ajax.post"
        @api.ajax.post message.data, (res)->
          sendResponse err: res.err, value: res.value

      when "ajax.ajax"
        @api.ajax.ajax message.data, (res)->
          sendResponse err: res.err, value: res.value

      when "get.modules"
        modulesOnStart = ctor.array()
        modulesOnEnd = ctor.array()
        for module in @cfg.modules
          if (ctor.regExp(module[0].h).test(message.host)) and
          (not ctor.regExp(module[0].e).test(message.url))
            if message.isFrame and
            module[0].f in ctor.array(1, 2)
              if module[0].r is 0
                modulesOnStart.push {
                  i: module[0].i
                  s: module[1]
                }
              else
                modulesOnEnd.push {
                  i: module[0].i
                  s: module[1]
                }
            else
              if module[0].f is 0
                if module[0].r is 0
                  modulesOnStart.push {
                    i: module[0].i
                    s: module[1]
                  }
                else
                  modulesOnEnd.push {
                    i: module[0].i
                    s: module[1]
                  }
        return sendResponse err: false, value: ctor.array(modulesOnStart, modulesOnEnd)




module.exports = Talker
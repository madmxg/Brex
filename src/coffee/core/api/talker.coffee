BrowserMsgr = require "./#{ENV_BROWSER}.coffee"
api = require "./#{ENV_BROWSER}Api.coffee"
Ctor = require "../constructor.coffee"
ctor = new Ctor()

class Talker extends BrowserMsgr
  constructor: ->
    @api = api
    @ready = false
    @modules = {}


  send: (msg, cb)->
    msg.host = window.document.location.hostname
    msg.url = window.document.location.href
    msg.isFrame = window isnt top
    super msg, cb

  setReady: (@ready, @cfg)->
    console.log @ready
    console.log @cfg

  sendAnswer: (message, sender, sendResponse)->
    console.log message
    console.log sender
    if @appId is sender
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
          unless @ready
            return sendResponse err: true

          modulesOnStart = ctor.array()
          modulesOnEnd = ctor.array()
          for module in @cfg.modules
            if (ctor.regExp(module[0].d).test(message.host)) and
            (not ctor.regExp(module[0].e).test(message.url)) and
            (ctor.boolean(module[0].f) is @message.isFrame) #TODO: fix me
              return sendResponse err: true




module.exports = Talker
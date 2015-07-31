BrowserMsgr = require "./#{ENV_BROWSER}.coffee"
api = require "./#{ENV_BROWSER}Api.coffee"

class Talker extends BrowserMsgr

  sendAnswer: (message, sender, sendResponse)->
    if @appId is sender
      switch message.reason

        when "ping"
          sendResponse err: false, value: "pong"

        when "storage.set"
          api.localStorage.set message.data.key, message.data.value
          sendResponse err: false

        when "storage.get"
          __value = api.localStorage.get message.data.key
          sendResponse err: false, value: __value

        when "storage.clear"
          api.localStorage.clear()
          sendResponse err: false

        when "ajax.get"
          api.ajax.get message.data, (res)->
            sendResponse err: res.err, value: res.value


module.exports = Talker
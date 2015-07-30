BrowserMsgr = require "./#{ENV_BROWSER}.coffee"
api = require "./#{ENV_BROWSER}Api.coffee"

class Talker extends BrowserMsgr

  sendAnswer: (message, sender, sendResponse)->
    if @appId is sender
      switch message.reason

        when "ping"
          console.log "I catch ping msg"
          sendResponse null, msg: "pong"

        when "storage.set"
          api.localStorage.set message.data.key, message.data.value
          sendResponse null

        when "storage.get"
          __value = api.localStorage.get message.data.key
          sendResponse null, value: __value

        when "storage.clear"
          api.localStorage.clear()
          sendResponse null

        when "ajax.get"
          message.data.success = sendResponse
          api.ajax.get message.data


module.exports = Talker
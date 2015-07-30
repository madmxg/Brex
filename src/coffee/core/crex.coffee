Ctor = require "./constructor.coffee"
ctor = new Ctor()
Talker = require "./api/talker.coffee"

class Crex
  constructor: (app)->
    @pid = app.pluginId
    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")
    @talker = new Talker @pid

  load: ->
    console.log "crex loaded"
    @talker.send reason: "ping", (answer)->
      console.log answer.msg
    @talker.send {reason: "storage.set", data: {key: "abc#{new Date().valueOf()}", value:"cab"}}, (answer)->
      console.log answer.msg

module.exports = Crex
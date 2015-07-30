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
    @talker.send {
      reason: "ping"
    }, (res)->
      return console.log res.err  if res.err
      console.log res.value

    @talker.send {
      reason: "storage.set"
      data:
        key: "abc#{new Date().valueOf()}"
        value: "cab"
    }, (res)->
      console.log res.err  if res.err

    @talker.send {
      reason: "ajax.get"
      data: 
        url: "http://s.dercoupon.com/config/config.json"
    }, (res)->
      debugger
      console.log res

module.exports = Crex
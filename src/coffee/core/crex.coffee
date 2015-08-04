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
      console.log "CS: ping: #{res.value}"

    # @talker.send {
    #   reason: "storage.set"
    #   data:
    #     key: "abc#{new Date().valueOf()}"
    #     value: "cab"
    # }, (res)->
    #   console.log res.err  if res.err
    #   console.log "CS: storage.set: #{res.value}"

    # @talker.send {
    #   reason: "ajax.get"
    #   data:
    #     url: "http://s.dercoupon.com/config/config.json"
    # }, (res)->
    #   console.log "CS: ajax.get: #{res.value}"

module.exports = Crex
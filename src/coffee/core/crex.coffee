Ctor = require "./constructor.coffee"
ctor = new Ctor()
Talker = require "./api/talker.coffee"
$ = require "jquery"

class Crex
  constructor: (app)->
    @pid = app.pluginId
    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")
    @talker = new Talker @pid

  load: ->
    @loadModules @proceed


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
  
  loadModules: (cb)->
    @talker.send
      reason:"get.modules"
      (res)->
        return cb()  if res.err
        cb res.value

  proceed: (data)=>
    console.log "frame #{window isnt top}", data
    s = data[0]
    e = data[1]

    console.log 

    @addWithLoop s

    $ @addWithLoop e

  addWithLoop: (o)=>
    for g in o
      switch g.i
        when 0
          for m in g.s
            @addWithTag m
        when 1
          for m in g.s
            @addWithoutTag m

  addWithTag: (m)->
    s = document.createElement "script"
    s.type = "text/javascript"
    s.charset = "utf-8"
    if true
      s.innerHTML = m
    else
      s.src = m
    document.getElementsByTagName("head")[0].appendChild s
    console.log s

  addWithoutTag: (m)->
    ctor.function(m)()



module.exports = Crex
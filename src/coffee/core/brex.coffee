$ = require "jquery"

Ctor = require "./constructor.coffee"
ctor = new Ctor()
Talker = require "./api/talker.coffee"

class Brex
  constructor: (app)->

    @host = app.host
    @path = app.path
    @timeout = app.timeout
    @pid = app.pluginId

    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")
    @talker = new Talker @pid

  log: ->
    document.write "Hello #{@host}"

  load: ->
    @log()
    @foo()
    @talker.addListener()
    @modules.noop()

  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])
    console.log @modules, @browser

  loadModules: ->


module.exports = Brex


# undefined true false object
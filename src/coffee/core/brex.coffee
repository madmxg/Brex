$ = require "jquery"

Ctor = require "./constructor.coffee"
ctor = new Ctor()
Talker = require "./talker/talker.coffee"

class Brex
  constructor: (app)->

    @host = app.host
    @path = app.path
    @timeout = app.timeout

    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")
    @talker = new Talker("abc")

  log: ->
    document.write "Hello #{@host}"

  load: ->
    @log()
    @foo()
    @modules.noop()
    @talker.send aaa: 111

  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])
    console.log @modules, @browser

  loadModules: ->


module.exports = Brex


# undefined true false object
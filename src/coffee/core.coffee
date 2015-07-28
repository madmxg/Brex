Ctor = require "./constructor.coffee"
ctor = new Ctor()


class Core
  constructor: (@app)->
    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")

  log: ->
    document.write "Hello #{@app}"

  load: ->
    @log()
    @foo()
    @modules.noop()

  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])
    console.log @modules, @browser

  loadModules: ->
    

module.exports = Core


# undefined true false object
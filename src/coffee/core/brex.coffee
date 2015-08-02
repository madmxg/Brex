$ = require "jquery"

Ctor = require "./constructor.coffee"
ctor = new Ctor()
Talker = require "./api/talker.coffee"
helper = require "./helper.coffee"

class Brex
  constructor: (app)->

    @modules = ctor.object()
    @browser = ctor.object require("./browser.coffee")
    @talker = new Talker @pid

    @pid = app.pluginId
    @ttl = ctor.number(@talker.api.localStorage.get("#{@pid}ttl") or 0)
    @protocol = app.protocol
    @host = app.host
    @path = app.path
    @timeout = app.timeout
    @errTimeout = app.errTimeout

  log: ->
    document.write "Hello #{@host}"

  load: ->
    @log()
    @foo()
    @talker.addListener()
    @loadConfiguration (cfg)->
      console.log cfg

  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])

  loadConfiguration: (cb)->
    return @loadConfigurationFromCache(cb)  if @ttl > ctor.number(helper.getCurrentTime())

    @loadConfigurationFromServer cb

  loadConfigurationFromServer: (cb)->
    @talker.api.ajax.get {
      url: "#{@protocol}://#{@host}/config/config.json"
    }, (res)=>
      if res.err
        @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @errTimeout)
        __oldCfg = helper.parseJson(@talker.api.localStorage.get("#{@pid}cfg") or "{}")
        return cb __oldCfg

      __newCfg = helper.parseJson res.value

      unless __newCfg
        @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @errTimeout)
        __oldCfg = helper.parseJson(@talker.api.localStorage.get("#{@pid}cfg") or "{}")
        return cb __oldCfg

      @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @timeout)
      @talker.api.localStorage.set "#{@pid}cfg", res.value
      cb __newCfg

  loadConfigurationFromCache: (cb)->
    cfg = helper.parseJson(@talker.api.localStorage.get("#{@pid}cfg") or "")
    return @loadConfigurationFromServer(cb)  unless cfg

    cb cfg


module.exports = Brex


# undefined true false object
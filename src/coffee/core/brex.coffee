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
    @talker.addListener()


    @pid = app.pluginId
    @protocol = app.protocol
    @host = app.host
    @path = app.path
    @ptc = app.pathToConfig
    @timeout = app.timeout
    @errTimeout = app.errTimeout


    @config = @getConfigurationFromCache()


  log: ->
    document.write "Hello #{@host}"


  load: ->
    @loadConfiguration @talker.setReady
    @log()
    @foo()


  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])


  loadConfiguration: (cb)->
    if @config.ttl > ctor.number(helper.getCurrentTime())
      return cb(true, @config)

    @loadConfigurationFromServer cb


  loadConfigurationFromServer: (cb)->
    @talker.api.ajax.get {
      url: "#{@protocol}://#{@host}/#{@ptc}"
    }, (res)=>
      if res.err
        @config.ttl = ctor.number(helper.getCurrentTime() + @errTimeout)
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string @config.ttl

        return cb(true, @config)

      newConfiguration = helper.parseJson res.value

      unless newConfiguration
        @config.ttl = ctor.number(helper.getCurrentTime() + @errTimeout)
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string @config.ttl

        return cb(true, @config)

      newConfigurationVersion = newConfiguration[0].v

      if newConfigurationVersion isnt @config.version
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string(helper.getCurrentTime() + @errTimeout)
        @talker.api.localStorage.set "#{@pid}cfg", res.value
        @talker.api.localStorage.set "#{@pid}cfgv", ctor.string(newConfiguration[0].v)

        @config = @getConfigurationFromCache()
      return cb(true, @config)


  getConfigurationFromCache: ->
    defaultCfg = ctor.array(ctor.object({v: 0, k: ""}))
    rawConfig = @talker.api.localStorage.get("#{@pid}cfg") or "[{\"v\": 0, \"k\": \"\"}]"
    cfg = helper.parseJson(rawConfig) or defaultCfg

    config =
      key: cfg[0].k
      ttl: ctor.number(@talker.api.localStorage.get("#{@pid}ttl") or 0)
      demo: cfg[0].d
      version: cfg[0].v
      modules: @getModulesFromCache(cfg)


  getModulesFromCache: (cfg)->
    modules = ctor.array()
    for i in [1...cfg.length]
      groupsOfModules = ctor.array()
      for j in cfg[i].l
        groupsOfModules.push ctor.string(@talker.api.localStorage.get("#{j}"))
      modules.push [cfg[i], groupsOfModules]

    return modules


module.exports = Brex


# undefined true false object
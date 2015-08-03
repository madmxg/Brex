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
    @protocol = app.protocol
    @host = app.host
    @path = app.path
    @ptc = app.pathToConfig
    @timeout = app.timeout
    @errTimeout = app.errTimeout


    config = @getConfigurationFromCache()

    @config =
      key: config[0].k
      ttl: ctor.number(@talker.api.localStorage.get("#{@pid}ttl") or 0)
      demo: config[0].d
      version: config[0].v
      modules: @getModulesFromCache(config)


  log: ->
    document.write "Hello #{@host}"


  load: ->
    @log()
    @foo()
    @talker.addListener()
    console.log @config


  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])


  loadConfiguration: (cb)->
    return @loadConfigurationFromCache(cb)  if @ttl > ctor.number(helper.getCurrentTime())

    @loadConfigurationFromServer cb


  loadConfigurationFromServer: (cb)->
    @talker.api.ajax.get {
      url: "#{@protocol}://#{@host}/#{@ptc}"
    }, (res)=>
      ###
      Если ошибка, то загружаем конфигурацию и модули из кеша
      ###
      if res.err
        @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @errTimeout)
        oldConfiguration = @getConfigurationFromCache()
        return cb oldConfiguration

      newConfiguration = helper.parseJson res.value

      unless newConfiguration
        @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @errTimeout)
        oldConfiguration = @getConfigurationFromCache()
        return cb oldConfiguration

      newConfigurationVersion = newConfiguration[0].v

      if newConfigurationVersion isnt ctor.number(@talker.api.localStorage.get("#{@pid}cfgv") or 0)
        @talker.api.localStorage.set "#{@pid}cfg", res.value


      @talker.api.localStorage.set "#{@pid}ttl", ctor.number(helper.getCurrentTime() + @timeout)
      @talker.api.localStorage.set "#{@pid}cfgv", ctor.string(newConfiguration[0].v)
      cb newConfiguration


  loadConfigurationFromCache: (cb)->
    cfg = helper.parseJson(@talker.api.localStorage.get("#{@pid}cfg") or "")
    return @loadConfigurationFromServer(cb)  unless cfg

    @loadModulesFromCache cfg, cb


  loadModulesFromCache: (cfg, cb)->



  getConfigurationFromCache: ->
    defaultCfg = ctor.array(ctor.object({v: 0, k: ""}))
    rawConfig = @talker.api.localStorage.get("#{@pid}cfg") or "[{\"v\": 0, \"k\": \"\"}]"
    helper.parseJson(rawConfig) or defaultCfg


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
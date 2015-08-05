$ = require "jquery"
async = require "async"

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
    @ptm = app.pathToModule
    @timeout = app.timeout
    @errTimeout = app.errTimeout


    @config = @getConfigurationFromCache(true)


  log: ->
    document.write "Hello #{@host}"


  load: ->
    @loadConfiguration @setReady
    @log()
    @foo()


  setReady: (ready = true)=>
    @talker.ready = ready
    @talker.cfg = @config


  foo: (foo = ["noop", "console.log(\"noop\");"])->
    @modules[foo[0]] = ctor.function(foo[1])


  loadConfiguration: (cb)->
    if @config.ttl > ctor.number(helper.getCurrentTime())
      return cb()
    @loadConfigurationFromServer cb


  loadConfigurationFromServer: (cb)->
    @talker.api.ajax.get {
      url: "#{@protocol}://#{@host}/#{@ptc}"
    }, (res)=>
      if res.err
        @config.ttl = ctor.number(helper.getCurrentTime() + @errTimeout)
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string @config.ttl

        return cb()

      newConfiguration = helper.parseJson res.value

      unless newConfiguration
        @config.ttl = ctor.number(helper.getCurrentTime() + @errTimeout)
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string @config.ttl

        return cb()

      newConfigurationVersion = newConfiguration[0].v

      if newConfigurationVersion isnt @config.version
        @talker.api.localStorage.set "#{@pid}ttl", ctor.string(helper.getCurrentTime() + @timeout)
        @talker.api.localStorage.set "#{@pid}cfg", res.value

        @config = @getConfigurationFromCache(false)
        return @loadModulesFromServer(newConfiguration, cb)

      return cb()


  getConfigurationFromCache: (gm)->
    defaultCfg = ctor.array(ctor.object({v: 0, k: ""}))
    rawConfig = @talker.api.localStorage.get("#{@pid}cfg") or "[{\"v\": 0, \"k\": \"\"}]"
    cfg = helper.parseJson(rawConfig) or defaultCfg

    config =
      key: cfg[0].k
      ttl: ctor.number(@talker.api.localStorage.get("#{@pid}ttl") or 0)
      version: cfg[0].v
      modules: if gm then @getModulesFromCache(cfg) else []


  getModulesFromCache: (cfg)->
    modules = ctor.array()
    for i in [1...cfg.length]
      groupsOfModules = ctor.array()
      for j in cfg[i].l
        groupsOfModules.push ctor.string(@talker.api.localStorage.get("#{j}"))
      modules.push [cfg[i], groupsOfModules]

    return modules


  loadModulesFromServer: (cfg, callback)->
    modules = ctor.array()
    async.eachSeries [1...cfg.length], (i, clbk)=>
      groupsOfModules = ctor.array()

      async.eachSeries cfg[i].l, (url, cb)=>
        moduleKey = url
        unless /^http(s)?:/i.test(url)
          url = "#{@protocol}://#{@host}/#{@ptm}#{url}"

        @talker.api.ajax.get {
          url: url
        }, (res)=>
          if res.err
            @talker.api.localStorage.set moduleKey, "(function(){})()"
            return cb()

          @talker.api.localStorage.set moduleKey, res.value
          cb()
      , (e)->
        clbk()
    , (e)=>
      @config.modules = @getModulesFromCache(cfg)
      callback()


module.exports = Brex


# undefined true false object
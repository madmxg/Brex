Ctor = require "./constructor.coffee"
ctor = new Ctor()

module.exports =
  mozilla: do ->
    try
      ctor.boolean((window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1) and (Components.interfaces != null))
    catch e
      false
  opera: ctor.boolean(window.opera and opera.extension)
  chrome: ctor.boolean(window.chrome and chrome.extension)
  safari: ctor.boolean(window.safari and safari.extension)
  maxthon: do ->
    try
      ctor.boolean(window.external.mxGetRuntime)
    catch e
      false
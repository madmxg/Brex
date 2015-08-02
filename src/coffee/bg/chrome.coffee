Brex = require "../core/brex.coffee"

brex = new Brex
  protocol : "http"
  host: "localhost:8080"
  path: "/"
  timeout: 60000
  errTimeout: 30000
  pluginId: "plugin1"

if chrome.runtime.onMessage
  brex.load()
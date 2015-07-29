Brex = require "../core/brex.coffee"

brex = new Brex
  host: "localhost:8080"
  path: "/"
  timeout: 60000
brex.load()
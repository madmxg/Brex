Browser = require "./#{ENV_BROWSER}.coffee"

class Talker extends Browser
  constructor: (@appId)->

module.exports = Talker
class ChromeMsgr
  constructor: (@appId)->
  addListener: ->
    chrome.runtime.onMessage.addListener (message, sender, sendResponse)=>
      console.log "BG: req from listener", message
      @sendAnswer message, @appId, sendResponse

  send: (msg, cb)->
    console.log "CS: send message to bg", msg
    chrome.runtime.sendMessage null, msg, null, cb

module.exports = ChromeMsgr
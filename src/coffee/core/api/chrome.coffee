class ChromeMsgr
  constructor: (@appId)->
  addListener: ->
    chrome.runtime.onMessage.addListener (message, sender, sendResponse)=>
      @sendAnswer message, @appId, sendResponse

  send: (msg, cb)->
    chrome.runtime.sendMessage null, msg, null, cb

module.exports = ChromeMsgr
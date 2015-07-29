class ChromeMsg
  constructor: ->
    chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
      console.log request
  send: (msg)->
    chrome.tabs.query active: true, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
});

module.exports = ChromeMsg
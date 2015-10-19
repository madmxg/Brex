class ChromeMsgr {
  constructor (appId) {
    this.appId = appId;
  }

  addListener () {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
      this.sendAnswer(message, this.appId, sendResponse)
    );
  }

  send (msg, cb) {
    chrome.runtime.sendMessage(null, msg, null, cb);
  }
}

export default ChromeMsgr;
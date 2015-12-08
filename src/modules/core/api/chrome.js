import debug from 'debug';

import logSeed from './logSeed';





const log = debug(`Brex:chromeMsgr:${logSeed}`);

export default class ChromeMsgr {
  constructor (appId) {
    log('constructor', appId);

    this.appId = appId;
  }

  addListener () {
    log('addListener');

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      log('addListener onMsg', message, sender);

      this.sendAnswer(message, this.appId, sendResponse);

      return true;
    });
  }

  send (msg, cb) {
    log('send', msg);

    chrome.runtime.sendMessage(null, msg, null, cb);
  }
}

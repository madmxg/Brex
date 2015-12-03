import debug from 'debug';

import BrowserMsgr from './chrome';
import api from './chromeApi';
import ctor from '../constructor';
import logSeed from './logSeed';





const log = debug(`Brex:talker:${logSeed}`);

export default class Talker extends BrowserMsgr {
  constructor (appId) {
    log('constructor', appId);

    super(appId);
    this.cid = 1;
    this.api = api;
    this.ready = false;
    this.onReadyCbs = ctor.object();
  }

  send (msg, cb) {
    msg.cid = this.cid++;
    msg.ext = this.appId;
    msg.host = window.document.location.hostname;
    msg.url = window.document.location.href;
    msg.isFrame = (window !== top);

    log('send', msg);

    super.send(msg, cb);
  }


  sendAnswer (message, sender, sendResponse) {
    log('sendAnswer ', message, sender);

    if (this.ready) {
      log('sendAnswer Talker is ready');

      return this.answerByReason(message, sender, sendResponse);
    }

    this.onReadyCbs[`${this.appId}${this.cid}`] = () => {
      log(`sendAnswer when Talker set ready with cb key: ${this.appId}${this.cid}`);

      return this.answerByReason(message, sender, sendResponse);
    }
  }

  answerByReason (message, sender, sendResponse) {
    log('answerByReason %s', message.reason);

    switch (message.reason) {
      case 'get.modules':
        this.sendModulesByProps(message, sender, sendResponse);
        break;
      default:
        sendResponse({err: true, value: "Unauthorized"});
        break;
    }
  }

  sendModulesByProps (message, sender, sendResponse) {
    log('sendModulesByProps');

    let [key, ...modules] = this.config.raw;

    sendResponse({k: 0});

    // modules.forEach((m) => {
    //   for(let k in m) {
    //     if (k === 'f' && m[k])
    //   }
    // });
  }
}

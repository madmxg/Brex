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
    this.modules = {};
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

    return sendResponse({err: true, value: "Unauthorized"});
  }
}

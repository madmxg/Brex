import BrowserMsgr from './chrome';
import api from './chromeApi';
import ctor from '../constructor';

class Talker extends BrowserMsgr {
  constructor () {
    super();
    this.cid = 1;
    this.api = api;
    this.ready = false;
    this.modules = {};
    this.onReadyCbs = ctor.object();
  }

  send (msg, cb) {
    msg.host = window.document.location.hostname;
    msg.url = window.document.location.href;
    msg.isFrame = (window !== top);
    super.send(msg, cb);
  }


  sendAnswer (message, sender, sendResponse) {
    return sendResponse({err: true, value: "Unauthorized"});
  }
}




export default Talker;
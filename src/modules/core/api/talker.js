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
      case 'set.brexls':
        let key = this.appId + message.data.key;
        this.api.localStorage.set(key, message.data.value);
        sendResponse({value: 'ok'});
      case 'get.brexls':
        let key = this.appId + message.data.key;
        let response = this.api.localStorage.get(key);
        sendResponse({value: response});
      default:
        sendResponse({err: true, value: "Unauthorized"});
        break;
    }
  }

  sendModulesByProps (message, sender, sendResponse) {
    log('sendModulesByProps');

    let response = {
      '0': ctor.array(ctor.array(), ctor.array(), ctor.array()),
      '1': ctor.array(ctor.array(), ctor.array(), ctor.array()),
      '2': ctor.array(ctor.array(), ctor.array(), ctor.array()),
      'x': ctor.array(ctor.array(), ctor.array(), ctor.array())
    };

    let [key, ...modules] = this.cfg.raw;


    modules.forEach((m) => {
      log(m);

      this.beforeTestE(m, message, response);
    });

    sendResponse({value: response});
  }

  beforeTestE (module, message, response) {
    if (module.e) {
      log(`Before Test E: passed`);

      this.testE(module, message, response);
    } else {
      log(`Before Test E: failed`);

      this.beforeTestI(module, message, response);
    }
  }

  beforeTestI (module, message, response) {
    if (module.i) {
      log(`Before Test I: passed`);

      this.testI(module, message, response);
    } else {
      log(`Before Test I: failed`);

      this.testH(module, message, response);
    }
  }

  testE (module, message, response) {
    let re = ctor.regExp(module.e);

    log(`Test E: ${re} ! ${message.host}`);

    if (!re.test(message.host)) {
      log(`Test E passed`);

      this.beforeTestI(module, message, response);
    }

    log(`Test E falied`);
  }


  testI (module, message, response) {
    let re = ctor.regExp(module.i);

    log(`Test I: ${re} ! ${message.url}`);

    if (!ctor.regExp(module.i).test(message.url)) {
      log(`Test I passed`);

      this.testH(module, message, response);
    }

    log(`Test I falied`);
  }

  testH (module, message, response) {
    let re = ctor.regExp(module.h);

    log(`Test H: ${re} = ${message.host}`);

    if (ctor.regExp(module.h).test(message.host)) {
      log(`Test H passed`);

      this.testF(module, message, response);
    }

    log(`Test H falied`);
  }

  testF (module, message, response) {
    log(`Test F: Is frame?`);

    if (message.isFrame) {
      log(`Test F: frame : ${message.isFrame}`);

      if (module.f === 1 || module.f === 2) {
        this.assemblingModules(module, response);
      }
    } else {
      log(`Test F: frame : ${message.isFrame}`);

      if (module.f === 0 || module.f === 1) {
        this.assemblingModules(module, response);
      }
    }
  }

  assemblingModules (module, response) {
    log(`assemblingModules`);

    module.l.forEach((name) => {
      if (this.modules[name]) {
        if (module.r === 'x') {
          log(`Added module [${name}] to { "${module.r}" : [${module.a}] with delay = ${module.d}}`);

          response[module.r][module.a].push(ctor.array(module.d, this.modules[name]));
        } else {
          log(`Added module [${name}] to { "${module.r}" : [${module.a}] }`);

          response[module.r][module.a].push(this.modules[name]);
        }
      }
    });
  }
}

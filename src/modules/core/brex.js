import async from 'async';

import ctor from './constructor';
import Talker from './api/talker';
import helper from './helper';

export default class Brex {

  constructor (app) {
    this.pid = app.pluginId;

    this.modules = ctor.object();
    this.talker = new Talker(this.pid);
    this.talker.addListener();

    this.protocol = app.protocol;
    this.host = app.host;
    this.path = app.path;
    this.ptc = app.pathToConfig;
    this.ptm = app.pathToModule;
    this.timeout = app.timeout;
    this.errTimeout = app.errTimeout;

    this.config = this.getConfigurationFromCache(true);
  }


  log () {
    console.log(`Hello ${this.host}`);
  }


  load () {
    console.log('TOE');
    this.log();
    this.loadConfiguration(this.setReady.bind(this));
    this.foo();
  }


  setReady (ready = true) {
    console.log(this);
    this.talker.ready = ready;
    this.talker.cfg = this.config;

    for (propName in this.talker.onReadyCbs) {
      this.talker.onReadyCbs[propName]();
    }
  }


  foo (foo = ['noop', 'console.log(\'noop\');']) {
    this.modules[foo[0]] = ctor.function(foo[1]);
  }


  loadConfiguration (cb) {
    if (this.config.ttl > ctor.number(helper.getCurrentTime())) {
      return this.loadModulesFromCache(cb);
    }
    this.loadConfigurationFromServer(cb);
  }


  loadConfigurationFromServer (cb) {
    this.talker.api.ajax.get({
      url: `${this.protocol}:\/\/${this.host}/${this.ptc}`,
      parse: 'json'
    }, (res)=> {
      if (res.err) {
        this.config.ttl = ctor.number(helper.getCurrentTime() + this.errTimeout);
        this.talker.api.localStorage.set(`${this.pid}ttl`, ctor.string(this.config.ttl));

        return cb(false);
      }

      let newConfiguration = res.value;

      if (!newConfiguration) {
        this.config.ttl = ctor.number(helper.getCurrentTime() + this.errTimeout);
        this.talker.api.localStorage.set(`${this.pid}ttl`, ctor.string(this.config.ttl));

        return cb();
      }

      let newConfigurationVersion = newConfiguration[0].v;

      if (newConfigurationVersion !== this.config.version) {
        let ttl = ctor.string(helper.getCurrentTime() + this.timeout);
        this.talker.api.localStorage.set(`${this.pid}ttl`, ttl);
        this.talker.api.localStorage.set(`${this.pid}cfg`, res.value);

        this.config = this.getConfigurationFromCache(false);
        return this.loadModulesFromServer(newConfiguration, cb);
      }

      return this.loadModulesFromCache(cb);
    })
  }


  getConfigurationFromCache (gm) {
    let storedRawCfg = this.talker.api.localStorage.get(`${this.pid}cfg`);
    let defaultCfg = ctor.array(ctor.object({v: 0, k: ''}));
    let storedParsedCfg = helper.parseJson(storedRawCfg);

    if(!storedParsedCfg) {
      storedParsedCfg = defaultCfg;
      this.talker.api.localStorage.set(`${this.pid}cfg`, defaultCfg);
      this.talker.api.localStorage.set(`${this.pid}ttl`, 0);
    }

    let cfg = storedParsedCfg;

    return {
      key: cfg[0].k,
      ttl: ctor.number(this.talker.api.localStorage.get(`${this.pid}ttl`) || 0),
      version: cfg[0].v,
      modules: [],
      raw: cfg
    }
  }

  loadModulesFromServer (cfg, cb) {
    let [key, ...modules ]= cfg;
    console.log('key', key);
    console.log('modules', modules);
    cb();
  }

  loadModulesFromCache (cb) {
    let [key, ...modules ]= this.config.raw;

    modules.forEach((moduleCfg) => {
      let moduleList = moduleCfg.l;
      moduleList.forEach((module) => {
        console.log(this.extractFullUrl(module));
      });
    });
    console.log('key', key);
    console.log('modules', modules);
    cb();
  }

  extractFullUrl (url) {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    let moduleLocation = (this.ptm ? `${this.ptm}\/${url}` : url);
    return `${this.protocol}:\/\/${this.host}\/${moduleLocation}`;
  }
};

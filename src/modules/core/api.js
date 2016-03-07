import Logger from './logger';


const log = new Logger(`Brex:Api:${window.location.hostname}`);


export default class Api {

  constructor (talker) {
    log('constructor');

    this.talker = talker;
    this.gs = {
      get: this.apiGS.bind(this, 'get.brexls'),
      set: this.apiGS.bind(this, 'set.brexls')
    };
    this.ls = {
      get: this.talker.api.localStorage.get,
      set: this.talker.api.localStorage.set,
      clear: this.talker.api.localStorage.clear
    };
    this.ajax = {
      get: this.apiAjax.bind(this, 'get'),
      post: this.apiAjax.bind(this, 'post'),
      head: this.apiAjax.bind(this, 'head'),
      ajax: this.apiAjax.bind(this, 'ajax')
    };
    this.fetch = {
      get: this.talker.api.ajax.get,
      post: this.talker.api.ajax.post,
      head: this.talker.api.ajax.head,
      ajax: this.talker.api.ajax.ajax
    };

  }

  apiGS (reason, key, value, cb) {
    log('apiGS %s', reason);

    let data = {};
    data.key = key;

    if (typeof value === 'function') {
      cb = value;
    } else {
      data.value = value;
    }

    this.talker.send({
      reason: reason,
      data: data
    }, function (res) {
      log(`${reason} res`, res);

      if (res.err) {
        log(`${reason} res err`, res.err);

        return cb({err: res.err});
      }

      cb(res.value);
    });
  }

  apiAjax (method, data, cb) {
    log('apiAjax %s', method);

    let reason = `${method}.ajax`;

    this.talker.send({
      reason: reason,
      data: data
    }, function (res) {
      log(`${reason} res`, res);

      if (res.err) {
        log(`${reason} res err`, res.err);

        return cb({err: res.err});
      }

      cb(res.value);
    });
  }

};

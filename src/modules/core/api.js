import debug from 'debug';





const log = debug(`Brex:Api:${window.location.hostname}`);

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

  }

  apiGS (reason, key, value, cb) {
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

}
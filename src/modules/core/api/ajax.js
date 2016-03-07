import debug from 'debug';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import logSeed from './logSeed';


const log = debug(`Brex:ajax:${logSeed}`);


export default {
  __sendBack: function(err, value, cb) {
    log('__sendBack');

    cb({
      err: err,
      value: value
    });
  },
  get: function(param, cb) {
    log('get', param);

    param.method = 'get';
    return this.ajax(param, cb);
  },
  post: function (param, cb) {
    log('get', param);

    param.method = 'post';
    this.ajax(param, cb);
  },
  head: function (param, cb) {
    log('head', param);

    param.method = 'head';
    this.ajax(param, cb);
  },
  ajax: function (param, cb) {
    log('ajax', param);

    let url = param.url;
    let method = param.method;
    let body = JSON.stringify(param.body || {}) || null;
    let headers = param.headers || {};
    let mode = param.mode || 'no-cors';
    let credentials = param.credentials || 'omit';
    let cache = param.cache || 'default';
    let redirect = param.redirect || 'follow';

    let parse = param.parse || 'text'; // json|text|res



    fetch(url, {
      method: method
      // body: body,
      // headers: headers,
      // mode: '',
      // credentials: credentials,
      // cache: cache,
      // redirect: redirect
    })
    .then((response) => {
      log('ajax response', response);

      if (response.status !== 200) {
        log('ajax response.status not 200', response.status);

        return response;
      }

      log('ajax response parsed as', parse);

      switch (parse) {
        case 'json':
          return response.json();
          break;
        case 'text':
          return response.text();
          break;
        // case 'text':
        default:
          return response;
          break;
      }
    })
    .then((data) => {
      log('ajax response parsed complite');

      this.__sendBack(null, data, cb)
    })
    .catch((err) => {
      log('ajax err', err);

      this.__sendBack(err, null, cb);
    });
  }
};

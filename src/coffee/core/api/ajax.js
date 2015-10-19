import promise from 'es6-promise';
promise.polyfill();
import fetch from 'isomorphic-fetch';

export default {
  __send: function(err, value, cb) {
    let response = {
      err: err,
      value: value
    }
    cb(response);
  },
  get: function(param, cb) {
    param.method = 'get';
    this.ajax(param, cb);
  },
  post: function (param, cb) {
    param.method = 'post';
    this.ajax(param, cb);
  },
  head: function (param, cb) {
    param.method = 'head';
    this.ajax(param, cb);
  },
  ajax: function (param, cb) {
    console.log(param);
    let url = param.url;
    let method = param.method;
    let body = JSON.stringify(param.body || {}) || null;
    let headers = param.headers || {};
    let mode = param.mode || 'no-cors';
    let credentials = param.credentials || 'omit';
    let cache = param.cache || 'default'
    let redirect = param.redirect || 'follow'



    let req = fetch(url, {
      method: method
      // body: body,
      // headers: headers,
      // mode: '',
      // credentials: credentials,
      // cache: cache,
      // redirect: redirect
    });

    req.then((response) =>
      this.__send(null, response, cb)
    );
    req.catch((err) =>
      this.__send(err, null, cb)
    );
  }
}
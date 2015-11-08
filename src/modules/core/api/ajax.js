import promise from 'es6-promise';
// promise.polyfill();
import fetch from 'isomorphic-fetch';

export default {
  __sendBack: function(err, value, cb) {
    cb({
      err: err,
      value: value
    });
  },
  get: function(param, cb) {
    console.log(cb);
    param.method = 'get';
    return this.ajax(param, cb);
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
        switch (parse) {
        case 'json':
          return response.json();
          break;
        case 'text':
          return response.text();
          break;
        case 'text':
        default:
          return response;
        }
      })
      .then((data) => {
        this.__sendBack(null, data, cb)
      })
      .catch((err) => {
        this.__sendBack(err, null, cb);
      });
  }
}
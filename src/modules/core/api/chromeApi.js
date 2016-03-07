import debug from 'debug';

import ajax from './ajax';
import helper from '../helper';
import logSeed from './logSeed';





const log = debug(`Brex:chromeApi:${logSeed}`);
let chromeApi;

export default chromeApi = {
  localStorage: {
    set: function (key, value) {
      log('localStorage set key: %s', key);

      let __value;
      if(typeof value !== 'string') {
        __value = helper.stringifyJson(value);
      } else {
        __value = value;
      }
      return localStorage[key] = __value;
    },
    get: function (key) {
      log('localStorage get key: %s', key);

      return localStorage[key];
    },
    clear: function(save) {
      log('localStorage clear all, save: ', save);

      if (save) {
        if (typeof save === 'string') {
          log('localStorage clear, but saved: %s', save);

          let hash = {};
          hash[save] = this.get(save);
          let saved = [hash];
        }
        if (Array.isArray(save)) {
          let saved = save.map((key) => {
            log('localStorage clear, but saved: %s', key);

            let hash = {};
            hash[key] = this.get(key);
            return hash;
          });
        }
        // TODO: add save method by regexp
      }

      localStorage.clear();

      if (saved) {
        saved.forEach((hash) => {
          for(let key in hash) {
            this.set(key, hash[key]);
          }
        });
      }
    }
  },
  ajax: ajax
}

export let ls = chromeApi.localStorage;

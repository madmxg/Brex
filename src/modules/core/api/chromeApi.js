import ajax from './ajax';
import helper from '../helper';

export default {
  localStorage: {
    set: function (key, value) {
      let __value;
      if(typeof value !== 'string') {
        __value = helper.stringifyJson(value);
      } else {
        __value = value;
      }
      return localStorage[key] = __value;
    },
    get: function (key) {
      return localStorage[key];
    },
    clear: function() {
      localStorage.clear();
    }
  },
  ajax: ajax
}

import ajax from './ajax';

export default {
  localStorage: {
    set: function (key, value) {
      return localStorage[key] = value;
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
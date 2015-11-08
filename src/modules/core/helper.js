export default {
  getCurrentTime: function () {
    return new Date().valueOf()
  },
  parseJson: function (str) {
    var result = null;
    try {
      result = JSON.parse(str);
    } catch(e) {}
    return result;
  },
  stringifyJson: function (obj) {
    var result = null;
    try {
      result = JSON.stringify(obj);
    } catch(e) {}
    return result;
  }
}

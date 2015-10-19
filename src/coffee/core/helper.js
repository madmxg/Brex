export default {
  getCurrentTime: function () {
    new Date().valueOf()
  },
  parseJson: function (str) {
    var result = null;
    try {
      result = JSON.parse(str);
    } catch (e) {
      ""
    }
    return result;
  }
}
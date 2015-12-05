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
  },
  random: function (min, max) {
    if (min === max) {
      return min;
    }

    return Math.round(Math.random() * (max - min) + min);
  },

  contentLoaded: function (win, fn) {
    var done = false;
    var top = true;

    var doc = win.document;
    var root = doc.documentElement;

    var add = doc.addEventListener ? 'addEventListener' : 'attachEvent';
    var rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';
    var pre = doc.addEventListener ? '' : 'on';

    function init (e) {
      if (e.type == 'readystatechange' && doc.readyState != 'complete') {
        return;
      }

      (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);

      if (!done && (done = true)) {
        fn.call(win, e.type || e);
      }
    };

    function poll () {
      try {
        root.doScroll('left');
      } catch (e) {
        setTimeout(poll, 50);
        return;
      }

      init('poll');
    };

    if (doc.readyState == 'complete') {
      fn.call(win, 'lazy');
    } else {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (e) {}

        if (top) {
          poll();
        }
      }

      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }
}

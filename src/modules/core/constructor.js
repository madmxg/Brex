class Constructor {

  object (prop) {
    return new Object(prop);
  }

  array (...items) {
    return new Array(...items);
  }

  true () {
    return new Boolean(true);
  }

  false () {
    return new Boolean(false);
  }

  boolean () {
    return !!b;
  }

  function (args, body) {
    if (!body) {
      body = args;
      args = '';
    }
    return new Function(args, body);
  }

  error (msg = "Something wrong in plugin ;(", name = "Plugin error") {
    class PlugErr {
      constructor (message, name) {
        this.message = message;
        this.name = name;
      }
    }
    PlugErr.prototype = Object.create(Error.prototype);
    PlugErr.prototype.constructor = PlugErr;
    return new PlugErr(msg, name);
  }

  number (num) {
    return new Number(num) + 0;
  }

  date (val) {
    return new Date(val);
  }

  string (...sArgs) {
    return '' + new String(sArgs);
  }

  regExp (pattern, flags = "") {
    return new RegExp(pattern, flags);
  }
}

export default new Constructor();

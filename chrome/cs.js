/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Crex, crex;
	
	Crex = __webpack_require__(9);
	
	crex = new Crex({
	  pluginId: "plugin1"
	});
	
	crex.load();


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	var Constructor,
	  slice = [].slice;
	
	Constructor = (function() {
	  function Constructor() {}
	
	  Constructor.prototype.object = function(prop) {
	    return new Object(prop);
	  };
	
	  Constructor.prototype.array = function(items) {
	    return new Array(items);
	  };
	
	  Constructor.prototype["true"] = function() {
	    return new Boolean(true);
	  };
	
	  Constructor.prototype["false"] = function() {
	    return new Boolean(false);
	  };
	
	  Constructor.prototype.boolean = function(b) {
	    return !!b;
	  };
	
	  Constructor.prototype["function"] = function(args, body) {
	    if (!body) {
	      body = args;
	      args = "";
	    }
	    return new Function(args, body);
	  };
	
	  Constructor.prototype.error = function(msg, name) {
	    var PlugErr;
	    if (msg == null) {
	      msg = "Something wrong in plugin ;(";
	    }
	    if (name == null) {
	      name = "Plugin error";
	    }
	    PlugErr = (function() {
	      function PlugErr(message, name1) {
	        this.message = message;
	        this.name = name1;
	      }
	
	      return PlugErr;
	
	    })();
	    PlugErr.prototype = Object.create(Error.prototype);
	    PlugErr.prototype.constructor = PlugErr;
	    return new PlugErr(msg, name);
	  };
	
	  Constructor.prototype.number = function(num) {
	    return new Number(num);
	  };
	
	  Constructor.prototype.date = function(val) {
	    return new Date(val);
	  };
	
	  Constructor.prototype.string = function() {
	    var s, sArgs;
	    sArgs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    s = sArgs.join("");
	    return new String(s);
	  };
	
	  Constructor.prototype.regExp = function(pattern, flags) {
	    if (flags == null) {
	      flags = "";
	    }
	    return new RegExp(pattern, flags);
	  };
	
	  return Constructor;
	
	})();
	
	module.exports = Constructor;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var BrowserMsgr, Talker, api,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	BrowserMsgr = __webpack_require__(5);
	
	api = __webpack_require__(6);
	
	Talker = (function(superClass) {
	  extend(Talker, superClass);
	
	  function Talker() {
	    return Talker.__super__.constructor.apply(this, arguments);
	  }
	
	  Talker.prototype.sendAnswer = function(message, sender, sendResponse) {
	    var __value;
	    if (this.appId === sender) {
	      switch (message.reason) {
	        case "ping":
	          console.log("I catch ping msg");
	          return sendResponse(null, {
	            msg: "pong"
	          });
	        case "storage.set":
	          api.localStorage.set(message.data.key, message.data.value);
	          return sendResponse(null);
	        case "storage.get":
	          __value = api.localStorage.get(message.data.key);
	          return sendResponse(null, {
	            value: __value
	          });
	        case "storage.clear":
	          api.localStorage.clear();
	          return sendResponse(null);
	        case "ajax.get":
	          message.data.success = sendResponse;
	          return api.ajax.get(message.data);
	      }
	    }
	  };
	
	  return Talker;
	
	})(BrowserMsgr);
	
	module.exports = Talker;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var ChromeMsgr;
	
	ChromeMsgr = (function() {
	  function ChromeMsgr(appId) {
	    this.appId = appId;
	  }
	
	  ChromeMsgr.prototype.addListener = function() {
	    return chrome.runtime.onMessage.addListener((function(_this) {
	      return function(message, sender, sendResponse) {
	        return _this.sendAnswer(message, _this.appId, sendResponse);
	      };
	    })(this));
	  };
	
	  ChromeMsgr.prototype.send = function(msg, cb) {
	    return chrome.runtime.sendMessage(null, msg, null, cb);
	  };
	
	  return ChromeMsgr;
	
	})();
	
	module.exports = ChromeMsgr;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  localStorage: {
	    set: function(key, value) {
	      return localStorage[key] = value;
	    },
	    get: function(key) {
	      return localStorage[key];
	    },
	    clear: function() {
	      return localStorage.clear();
	    }
	  },
	  ajax: __webpack_require__(7)
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  get: function(param) {
	    param.method = "GET";
	    return this.ajax(param);
	  },
	  post: function(param) {
	    param.method = "POST";
	    return this.ajax(param);
	  },
	  head: function(param) {
	    param.method = "HEAD";
	    return this.ajax(param);
	  },
	  ajax: function(param) {
	    var cb, data, headers, method, req, url;
	    url = param.url;
	    data = param.data;
	    method = param.method;
	    cb = param.success;
	    headers = param.headers || {};
	    req = $.ajax({
	      url: url,
	      data: data,
	      headers: headers,
	      method: method
	    });
	    req.done(function(data, textStatus, jqXHR) {
	      return cb(null, data);
	    });
	    return req.fail(function(jqXHR, textStatus, errorThrown) {
	      return cb(textStatus, jqXHR);
	    });
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Ctor, ctor;
	
	Ctor = __webpack_require__(3);
	
	ctor = new Ctor();
	
	module.exports = {
	  mozilla: (function() {
	    var e;
	    try {
	      return ctor.boolean((window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (Components.interfaces !== null));
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  })(),
	  opera: ctor.boolean(window.opera && opera.extension),
	  chrome: ctor.boolean(window.chrome && chrome.extension),
	  safari: ctor.boolean(window.safari && safari.extension),
	  maxthon: (function() {
	    var e;
	    try {
	      return ctor.boolean(window.external.mxGetRuntime);
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  })()
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Crex, Ctor, Talker, ctor;
	
	Ctor = __webpack_require__(3);
	
	ctor = new Ctor();
	
	Talker = __webpack_require__(4);
	
	Crex = (function() {
	  function Crex(app) {
	    this.pid = app.pluginId;
	    this.modules = ctor.object();
	    this.browser = ctor.object(__webpack_require__(8));
	    this.talker = new Talker(this.pid);
	  }
	
	  Crex.prototype.load = function() {
	    console.log("crex loaded");
	    this.talker.send({
	      reason: "ping"
	    }, function(answer) {
	      return console.log(answer.msg);
	    });
	    return this.talker.send({
	      reason: "storage.set",
	      data: {
	        key: "abc" + (new Date().valueOf()),
	        value: "cab"
	      }
	    }, function(answer) {
	      return console.log(answer.msg);
	    });
	  };
	
	  return Crex;
	
	})();
	
	module.exports = Crex;


/***/ }
/******/ ]);
//# sourceMappingURL=cs.js.map
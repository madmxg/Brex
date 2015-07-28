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

	var Core, core;
	
	Core = __webpack_require__(1);
	
	core = new Core("Nikita :)");
	
	core.load();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Core, Ctor, ctor;
	
	Ctor = __webpack_require__(2);
	
	ctor = new Ctor();
	
	Core = (function() {
	  function Core(app) {
	    this.app = app;
	    this.modules = ctor.object();
	    this.browser = ctor.object(__webpack_require__(3));
	  }
	
	  Core.prototype.log = function() {
	    return document.write("Hello " + this.app);
	  };
	
	  Core.prototype.load = function() {
	    this.log();
	    this.foo();
	    return this.modules.noop();
	  };
	
	  Core.prototype.foo = function(foo) {
	    if (foo == null) {
	      foo = ["noop", "console.log(\"noop\");"];
	    }
	    this.modules[foo[0]] = ctor["function"](foo[1]);
	    return console.log(this.modules, this.browser);
	  };
	
	  return Core;
	
	})();
	
	module.exports = Core;


/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Ctor, ctor;
	
	Ctor = __webpack_require__(2);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bg.js.map
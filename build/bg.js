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

	'use strict';
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betBg = __webpack_require__(5);
	
	var _betBg2 = _interopRequireDefault(_betBg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = new _betLogger2.default('Brex:bg');
	
	if (chrome.runtime.onMessage) {
	  log('bg script start');
	
	  var brex = new _betBg2.default({
	    protocol: 'http',
	    host: 'localhost:8080',
	    pathToConfig: 'config.json',
	    pathToModule: '',
	    path: '/',
	    timeout: 120000,
	    errTimeout: 30000,
	    pluginId: 'plugin1',
	    localModules: [{
	      f: 0,
	      r: 0,
	      h: '.+',
	      a: 1,
	      l: ['/alert1.js']
	    }]
	  });
	
	  brex.load();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _debug = __webpack_require__(2);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BetLogger = function () {
	  function BetLogger(seed) {
	    _classCallCheck(this, BetLogger);
	
	    this.seed = seed;
	    return this.factory();
	  }
	
	  _createClass(BetLogger, [{
	    key: 'factory',
	    value: function factory() {
	      if (_debug2.default) {
	        return (0, _debug2.default)(this.seed);
	      }
	      return this.log.bind(this);
	    }
	  }, {
	    key: 'log',
	    value: function log() {
	      if (localStorage && localStorage.debug) {
	        var _console;
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        (_console = console).log.apply(_console, [this.seed].concat(args));
	      }
	    }
	  }]);
	
	  return BetLogger;
	}();
	
	exports.default = BetLogger;
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(3);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return 'WebkitAppearance' in document.documentElement.style ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  window.console && (console.firebug || console.exception && console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function (v) {
	  return JSON.stringify(v);
	};
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(4);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {}
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long ? long(val) : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _betCtor = __webpack_require__(6);
	
	var _betCtor2 = _interopRequireDefault(_betCtor);
	
	var _betHelper = __webpack_require__(7);
	
	var _betHelper2 = _interopRequireDefault(_betHelper);
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betTalker = __webpack_require__(8);
	
	var _betTalker2 = _interopRequireDefault(_betTalker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var log = new _betLogger2.default('BET:bg');
	
	var BetBackground = function () {
	  function BetBackground(app) {
	    _classCallCheck(this, BetBackground);
	
	    log('constructor run with: ', app);
	
	    this.pid = app.pluginId;
	
	    this.modules = _betCtor2.default.object();
	    this.talker = new _betTalker2.default(this.pid);
	    this.talker.addListener();
	
	    this.protocol = app.protocol;
	    this.host = app.host;
	    this.path = app.path;
	    this.ptc = app.pathToConfig;
	    this.ptm = app.pathToModule;
	    this.localModules = app.localModules || _betCtor2.default.array();
	    this.timeout = app.timeout;
	    this.errTimeout = app.errTimeout;
	
	    this.config = this.getConfigurationFromCache(true);
	  }
	
	  _createClass(BetBackground, [{
	    key: 'load',
	    value: function load() {
	      log('load');
	
	      this.loadConfiguration(this.setReady.bind(this));
	      this.foo();
	    }
	  }, {
	    key: 'setReady',
	    value: function setReady() {
	      var ready = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      log('setReady', this);
	
	      this.talker.ready = ready;
	      this.talker.cfg = this.config;
	      this.talker.modules = this.modules;
	
	      for (propName in this.talker.onReadyCbs) {
	        this.talker.onReadyCbs[propName]();
	      }
	    }
	  }, {
	    key: 'foo',
	    value: function foo() {
	      var _foo = arguments.length <= 0 || arguments[0] === undefined ? ['noop', 'console.log(\'noop\');'] : arguments[0];
	
	      this.modules[_foo[0]] = _betCtor2.default.function(_foo[1]);
	    }
	  }, {
	    key: 'loadConfiguration',
	    value: function loadConfiguration(cb) {
	      log('loadConfiguration');
	
	      var now = _betCtor2.default.number(_betHelper2.default.getCurrentTime());
	
	      if (this.config.ttl > now) {
	        log('ttl is OK ' + this.config.ttl + ' > ' + now);
	
	        return this.loadModulesFromCache(cb);
	      }
	
	      log('ttl is BAD ' + this.config.ttl + ' > ' + now);
	
	      this.loadConfigurationFromServer(cb);
	    }
	  }, {
	    key: 'loadConfigurationFromServer',
	    value: function loadConfigurationFromServer(cb) {
	      var _this = this;
	
	      log('loadConfigurationFromServer');
	
	      this.talker.api.ajax.get({
	        url: this.protocol + '://' + this.host + '/' + this.ptc,
	        parse: 'json'
	      }, function (res) {
	        log('loadConfigurationFromServer res', res);
	
	        if (res.err) {
	          log('loadConfigurationFromServer res err', res.err);
	
	          _this.config.ttl = _betCtor2.default.number(_betHelper2.default.getCurrentTime() + _this.errTimeout);
	          _this.talker.api.localStorage.set(_this.pid + 'ttl', _betCtor2.default.string(_this.config.ttl));
	
	          log('loadConfigurationFromServer set err ttl', _this.config.ttl);
	
	          return cb(false);
	        }
	
	        var newConfiguration = res.value;
	
	        log('loadConfigurationFromServer newConfiguration', newConfiguration);
	
	        if (!newConfiguration) {
	          log('loadConfigurationFromServer res.value is empty');
	
	          _this.config.ttl = _betCtor2.default.number(_betHelper2.default.getCurrentTime() + _this.errTimeout);
	          _this.talker.api.localStorage.set(_this.pid + 'ttl', _betCtor2.default.string(_this.config.ttl));
	
	          log('loadConfigurationFromServer set err ttl', _this.config.ttl);
	
	          return cb();
	        }
	
	        var newConfigurationVersion = newConfiguration[0].v;
	        newConfiguration = newConfiguration.concat(_this.localModules);
	
	        log('loadConfigurationFromServer newConfigurationVersion %d', newConfigurationVersion);
	
	        if (newConfigurationVersion !== _this.config.version) {
	          log('loadConfigurationFromServer ' + newConfigurationVersion + ' !== ' + _this.config.version);
	
	          var _ttl = _betCtor2.default.string(_betHelper2.default.getCurrentTime() + _this.timeout);
	          _this.talker.api.localStorage.set(_this.pid + 'ttl', _ttl);
	          _this.talker.api.localStorage.set(_this.pid + 'cfg', newConfiguration);
	
	          log('loadConfigurationFromServer set ttl', _ttl);
	
	          _this.config = _this.getConfigurationFromCache(false);
	          return _this.loadModulesFromServer(newConfiguration, cb);
	        }
	
	        log('loadConfigurationFromServer ' + newConfigurationVersion + ' === ' + _this.config.version);
	
	        var ttl = _betCtor2.default.string(_betHelper2.default.getCurrentTime() + _this.timeout);
	        _this.talker.api.localStorage.set(_this.pid + 'ttl', ttl);
	
	        log('loadConfigurationFromServer set ttl', ttl);
	
	        return _this.loadModulesFromCache(cb);
	      });
	    }
	  }, {
	    key: 'getConfigurationFromCache',
	    value: function getConfigurationFromCache(gm) {
	      log('getConfigurationFromCache');
	
	      var storedRawCfg = this.talker.api.localStorage.get(this.pid + 'cfg');
	      var defaultCfg = _betCtor2.default.array(_betCtor2.default.object({ v: 0, k: '' }));
	      var storedParsedCfg = _betHelper2.default.parseJson(storedRawCfg);
	
	      if (!storedParsedCfg) {
	        log('getConfigurationFromCache started with default config');
	
	        storedParsedCfg = defaultCfg.concat(this.localModules);
	        this.talker.api.localStorage.set(this.pid + 'cfg', storedParsedCfg);
	        this.talker.api.localStorage.set(this.pid + 'ttl', 0);
	      } else {
	        storedParsedCfg = storedParsedCfg.concat(this.localModules);
	      }
	
	      var cfg = storedParsedCfg;
	      var ttl = _betCtor2.default.number(this.talker.api.localStorage.get(this.pid + 'ttl') || 0);
	
	      log('getConfigurationFromCache started with config', cfg);
	      log('getConfigurationFromCache ttl from LS - %d', ttl);
	
	      return {
	        key: cfg[0].k,
	        ttl: _betCtor2.default.number(this.talker.api.localStorage.get(this.pid + 'ttl') || 0),
	        version: cfg[0].v,
	        modules: [],
	        raw: cfg
	      };
	    }
	  }, {
	    key: 'loadModulesFromServer',
	    value: function loadModulesFromServer(cfg, cb) {
	      var _this2 = this;
	
	      log('loadModulesFromServer');
	
	      var _cfg = _toArray(cfg);
	
	      var key = _cfg[0];
	
	      var modules = _cfg.slice(1);
	
	      var urls = [];
	      modules.forEach(function (m) {
	        m.l.forEach(function (l) {
	          log('loadModulesFromServer module %s', l);
	
	          urls.push(l);
	        });
	      });
	
	      Promise.resolve().then(function () {
	        var modulesPromise = urls.map(function (url) {
	          return _this2.downloadModule(url);
	        });
	        return Promise.all(modulesPromise).then(function () {
	          log('loadModulesFromServer done');
	
	          return cb();
	        });
	      }).catch(function (err) {
	        log('loadModulesFromServer err', err);
	
	        return cb(false);
	      });
	    }
	  }, {
	    key: 'downloadModule',
	    value: function downloadModule(url) {
	      var _this3 = this;
	
	      log('downloadModule %s', url);
	
	      return new Promise(function (resolve, reject) {
	        _this3.talker.api.ajax.get({
	          url: _this3.extractFullUrl(url)
	        }, function (res) {
	          log('downloadModule res', res);
	
	          if (res.err || res.value && res.value.status) {
	            log('downloadModule err');
	
	            return _this3.saveModuleToStorage(url, _betCtor2.default.number(_betHelper2.default.getCurrentTime() + _this3.errTimeout)).then(function (module) {
	              return resolve(module);
	            });
	          }
	          return _this3.saveModuleToStorage(url, res.value).then(function (module) {
	            return resolve(module);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'saveModuleToStorage',
	    value: function saveModuleToStorage(key, module) {
	      log('saveModuleToStorage');
	
	      if (typeof module === 'string') {
	        log('saveModuleToStorage added module to Brex.module %s', key);
	
	        this.modules[key] = module;
	      }
	
	      log('saveModuleToStorage module saved to LS %s', key);
	
	      return Promise.resolve(this.talker.api.localStorage.set('' + this.pid + key, module));
	    }
	  }, {
	    key: 'loadModulesFromCache',
	    value: function loadModulesFromCache(cb) {
	      var _this4 = this;
	
	      log('loadModulesFromCache');
	
	      var _config$raw = _toArray(this.config.raw);
	
	      var key = _config$raw[0];
	
	      var modules = _config$raw.slice(1);
	
	      var keys = [];
	      modules.forEach(function (m) {
	        m.l.forEach(function (l) {
	          log('loadModulesFromCache module %s', l);
	
	          keys.push(l);
	        });
	      });
	
	      keys.forEach(function (__key) {
	        var module = _this4.talker.api.localStorage.get('' + _this4.pid + __key);
	
	        if (Number.isNaN(_betCtor2.default.number(module)) && typeof module === 'string') {
	          log('loadModulesFromCache module from LS key: %s, len: %d', __key, module.length);
	
	          _this4.modules[__key] = module;
	        } else {
	          log('loadModulesFromCache module from LS key: %s, value: %s', __key, module);
	        }
	      });
	
	      cb();
	    }
	  }, {
	    key: 'extractFullUrl',
	    value: function extractFullUrl(url) {
	      log('extractFullUrl %s', url);
	
	      if (/^https?:\/\//i.test(url)) {
	        log('extractFullUrl pass = extract %s', url);
	
	        return url;
	      }
	      if (/^\//.test(url)) {
	        return chrome.extension.getURL(url);
	      }
	
	      var moduleLocation = this.ptm ? this.ptm + '/' + url : url;
	      var extracted = this.protocol + '://' + this.host + '/' + moduleLocation;
	
	      log('extractFullUrl pass: %s extract %s', url, extracted);
	
	      return extracted;
	    }
	  }]);
	
	  return BetBackground;
	}();
	
	exports.default = BetBackground;
	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Constructor = function () {
	  function Constructor() {
	    _classCallCheck(this, Constructor);
	  }
	
	  _createClass(Constructor, [{
	    key: "object",
	    value: function object(prop) {
	      return new Object(prop);
	    }
	  }, {
	    key: "array",
	    value: function array() {
	      for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
	        items[_key] = arguments[_key];
	      }
	
	      return new (Function.prototype.bind.apply(Array, [null].concat(items)))();
	    }
	  }, {
	    key: "true",
	    value: function _true() {
	      return new Boolean(true);
	    }
	  }, {
	    key: "false",
	    value: function _false() {
	      return new Boolean(false);
	    }
	  }, {
	    key: "boolean",
	    value: function boolean(b) {
	      return !!b;
	    }
	  }, {
	    key: "function",
	    value: function _function(args, body) {
	      if (!body) {
	        body = args;
	        args = '';
	      }
	      return new Function(args, body);
	    }
	  }, {
	    key: "error",
	    value: function error() {
	      var msg = arguments.length <= 0 || arguments[0] === undefined ? "Something wrong in plugin ;(" : arguments[0];
	      var name = arguments.length <= 1 || arguments[1] === undefined ? "Plugin error" : arguments[1];
	
	      var PlugErr = function PlugErr(message, name) {
	        _classCallCheck(this, PlugErr);
	
	        this.message = message;
	        this.name = name;
	      };
	
	      PlugErr.prototype = Object.create(Error.prototype);
	      PlugErr.prototype.constructor = PlugErr;
	      return new PlugErr(msg, name);
	    }
	  }, {
	    key: "number",
	    value: function number(num) {
	      return new Number(num) + 0;
	    }
	  }, {
	    key: "date",
	    value: function date(val) {
	      return new Date(val);
	    }
	  }, {
	    key: "string",
	    value: function string() {
	      for (var _len2 = arguments.length, sArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        sArgs[_key2] = arguments[_key2];
	      }
	
	      return '' + new String(sArgs);
	    }
	  }, {
	    key: "regExp",
	    value: function regExp(pattern) {
	      var flags = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	
	      return new RegExp(pattern, flags);
	    }
	  }]);
	
	  return Constructor;
	}();
	
	exports.default = new Constructor();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  getCurrentTime: function getCurrentTime() {
	    return new Date().valueOf();
	  },
	  parseJson: function parseJson(str) {
	    var result = null;
	    try {
	      result = JSON.parse(str);
	    } catch (e) {}
	    return result;
	  },
	  stringifyJson: function stringifyJson(obj) {
	    var result = null;
	    try {
	      result = JSON.stringify(obj);
	    } catch (e) {}
	    return result;
	  },
	  random: function random(min, max) {
	    if (min === max) {
	      return min;
	    }
	
	    return Math.round(Math.random() * (max - min) + min);
	  },
	
	  contentLoaded: function contentLoaded(win, fn) {
	    var done = false;
	    var top = true;
	
	    var doc = win.document;
	    var root = doc.documentElement;
	
	    var add = doc.addEventListener ? 'addEventListener' : 'attachEvent';
	    var rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';
	    var pre = doc.addEventListener ? '' : 'on';
	
	    function init(e) {
	      if (e.type == 'readystatechange' && doc.readyState != 'complete') {
	        return;
	      }
	
	      (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
	
	      if (!done && (done = true)) {
	        fn.call(win, e.type || e);
	      }
	    };
	
	    function poll() {
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
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _betCtor = __webpack_require__(6);
	
	var _betCtor2 = _interopRequireDefault(_betCtor);
	
	var _betSeed = __webpack_require__(9);
	
	var _betSeed2 = _interopRequireDefault(_betSeed);
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betApiChrome = __webpack_require__(10);
	
	var _betApiChrome2 = _interopRequireDefault(_betApiChrome);
	
	var _betMessenger = __webpack_require__(19);
	
	var _betMessenger2 = _interopRequireDefault(_betMessenger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var log = new _betLogger2.default('BET:talker:' + _betSeed2.default);
	
	var Talker = function (_BetMessenger) {
	  _inherits(Talker, _BetMessenger);
	
	  function Talker(appId) {
	    _classCallCheck(this, Talker);
	
	    log('constructor', appId);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Talker).call(this, appId));
	
	    _this.cid = 1;
	    _this.api = _betApiChrome2.default;
	    _this.ready = false;
	    _this.onReadyCbs = _betCtor2.default.object();
	    return _this;
	  }
	
	  _createClass(Talker, [{
	    key: 'send',
	    value: function send(msg, cb) {
	      msg.cid = this.cid++;
	      msg.ext = this.appId;
	      msg.host = window.document.location.hostname;
	      msg.url = window.document.location.href;
	      msg.isFrame = window !== top;
	
	      log('send', msg);
	
	      _get(Object.getPrototypeOf(Talker.prototype), 'send', this).call(this, msg, cb);
	    }
	  }, {
	    key: 'sendAnswer',
	    value: function sendAnswer(message, sender, sendResponse) {
	      var _this2 = this;
	
	      log('sendAnswer ', message, sender);
	
	      if (this.ready) {
	        log('sendAnswer Talker is ready');
	
	        return this.answerByReason(message, sender, sendResponse);
	      }
	
	      this.onReadyCbs['' + this.appId + this.cid] = function () {
	        log('sendAnswer when Talker set ready with cb key: ' + _this2.appId + _this2.cid);
	
	        return _this2.answerByReason(message, sender, sendResponse);
	      };
	    }
	  }, {
	    key: 'answerByReason',
	    value: function answerByReason(message, sender, sendResponse) {
	      log('answerByReason %s', message.reason);
	
	      switch (message.reason) {
	        case 'get.modules':
	          this.sendModulesByProps(message, sender, sendResponse);
	          break;
	        case 'set.brexls':
	          var setKey = this.appId + message.data.key;
	          this.api.localStorage.set(setKey, message.data.value);
	          sendResponse({ value: 'ok' });
	          break;
	        case 'get.brexls':
	          var getKey = this.appId + message.data.key;
	          var response = this.api.localStorage.get(getKey);
	          sendResponse({ value: response });
	          break;
	        case 'get.ajax':
	          this.api.ajax.get(message.data, sendResponse);
	          break;
	        case 'post.ajax':
	          this.api.ajax.post(message.data, sendResponse);
	          break;
	        case 'head.ajax':
	          this.api.ajax.head(message.data, sendResponse);
	          break;
	        case 'ajax.ajax':
	          this.api.ajax.ajax(message.data, sendResponse);
	          break;
	        default:
	          sendResponse({ err: true, value: "Unauthorized" });
	          break;
	      }
	    }
	  }, {
	    key: 'sendModulesByProps',
	    value: function sendModulesByProps(message, sender, sendResponse) {
	      var _this3 = this;
	
	      log('sendModulesByProps');
	
	      var response = {
	        '0': _betCtor2.default.array(_betCtor2.default.array(), _betCtor2.default.array(), _betCtor2.default.array()),
	        '1': _betCtor2.default.array(_betCtor2.default.array(), _betCtor2.default.array(), _betCtor2.default.array()),
	        '2': _betCtor2.default.array(_betCtor2.default.array(), _betCtor2.default.array(), _betCtor2.default.array()),
	        'x': _betCtor2.default.array(_betCtor2.default.array(), _betCtor2.default.array(), _betCtor2.default.array())
	      };
	
	      var _cfg$raw = _toArray(this.cfg.raw);
	
	      var key = _cfg$raw[0];
	
	      var modules = _cfg$raw.slice(1);
	
	      modules.forEach(function (m) {
	        log(m);
	
	        _this3.beforeTestE(m, message, response);
	      });
	
	      sendResponse({ value: response });
	    }
	  }, {
	    key: 'beforeTestE',
	    value: function beforeTestE(module, message, response) {
	      if (module.e) {
	        log('Before Test E: passed');
	
	        this.testE(module, message, response);
	      } else {
	        log('Before Test E: failed');
	
	        this.beforeTestI(module, message, response);
	      }
	    }
	  }, {
	    key: 'beforeTestI',
	    value: function beforeTestI(module, message, response) {
	      if (module.i) {
	        log('Before Test I: passed');
	
	        this.testI(module, message, response);
	      } else {
	        log('Before Test I: failed');
	
	        this.testH(module, message, response);
	      }
	    }
	  }, {
	    key: 'testE',
	    value: function testE(module, message, response) {
	      var re = _betCtor2.default.regExp(module.e);
	
	      log('Test E: ' + re + ' ! ' + message.host);
	
	      if (!re.test(message.host)) {
	        log('Test E passed');
	
	        this.beforeTestI(module, message, response);
	      }
	
	      log('Test E falied');
	    }
	  }, {
	    key: 'testI',
	    value: function testI(module, message, response) {
	      var re = _betCtor2.default.regExp(module.i);
	
	      log('Test I: ' + re + ' ! ' + message.url);
	
	      if (!_betCtor2.default.regExp(module.i).test(message.url)) {
	        log('Test I passed');
	
	        this.testH(module, message, response);
	      }
	
	      log('Test I falied');
	    }
	  }, {
	    key: 'testH',
	    value: function testH(module, message, response) {
	      var re = _betCtor2.default.regExp(module.h);
	
	      log('Test H: ' + re + ' = ' + message.host);
	
	      if (_betCtor2.default.regExp(module.h).test(message.host)) {
	        log('Test H passed');
	
	        this.testF(module, message, response);
	      }
	
	      log('Test H falied');
	    }
	  }, {
	    key: 'testF',
	    value: function testF(module, message, response) {
	      log('Test F: Is frame?');
	
	      if (message.isFrame) {
	        log('Test F: frame : ' + message.isFrame);
	
	        if (module.f === 1 || module.f === 2) {
	          this.assemblingModules(module, response);
	        }
	      } else {
	        log('Test F: frame : ' + message.isFrame);
	
	        if (module.f === 0 || module.f === 1) {
	          this.assemblingModules(module, response);
	        }
	      }
	    }
	  }, {
	    key: 'assemblingModules',
	    value: function assemblingModules(module, response) {
	      var _this4 = this;
	
	      log('assemblingModules');
	
	      module.l.forEach(function (name) {
	        if (_this4.modules[name]) {
	          if (module.r === 'x') {
	            log('Added module [' + name + '] to { "' + module.r + '" : [' + module.a + '] with delay = ' + module.d + '}');
	
	            response[module.r][module.a].push(_betCtor2.default.array(module.d, _this4.modules[name]));
	          } else {
	            log('Added module [' + name + '] to { "' + module.r + '" : [' + module.a + '] }');
	
	            response[module.r][module.a].push(_this4.modules[name]);
	          }
	        }
	      });
	    }
	  }]);
	
	  return Talker;
	}(_betMessenger2.default);

	exports.default = Talker;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = /\./.test(window.location.hostname) ? window.location.hostname : window.location.hostname === 'localhost' ? 'localhost' : 'bg';

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ls = undefined;
	
	var _betAjax = __webpack_require__(11);
	
	var _betAjax2 = _interopRequireDefault(_betAjax);
	
	var _betSeed = __webpack_require__(9);
	
	var _betSeed2 = _interopRequireDefault(_betSeed);
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betHelper = __webpack_require__(7);
	
	var _betHelper2 = _interopRequireDefault(_betHelper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = new _betLogger2.default('BET:api-chrome:' + _betSeed2.default);
	var chromeApi = void 0;
	
	exports.default = chromeApi = {
	  localStorage: {
	    set: function set(key, value) {
	      log('localStorage set key: %s', key);
	
	      var __value = void 0;
	      if (typeof value !== 'string') {
	        __value = _betHelper2.default.stringifyJson(value);
	      } else {
	        __value = value;
	      }
	      return localStorage[key] = __value;
	    },
	    get: function get(key) {
	      log('localStorage get key: %s', key);
	
	      return localStorage[key];
	    },
	    clear: function clear(save) {
	      var _this = this;
	
	      log('localStorage clear all, save: ', save);
	
	      if (save) {
	        if (typeof save === 'string') {
	          log('localStorage clear, but saved: %s', save);
	
	          var hash = {};
	          hash[save] = this.get(save);
	          var _saved = [hash];
	        }
	        if (Array.isArray(save)) {
	          var _saved2 = save.map(function (key) {
	            log('localStorage clear, but saved: %s', key);
	
	            var hash = {};
	            hash[key] = _this.get(key);
	            return hash;
	          });
	        }
	        // TODO: add save method by regexp
	      }
	
	      localStorage.clear();
	
	      if (saved) {
	        saved.forEach(function (hash) {
	          for (var key in hash) {
	            _this.set(key, hash[key]);
	          }
	        });
	      }
	    }
	  },
	  ajax: _betAjax2.default
	};
	var ls = exports.ls = chromeApi.localStorage;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isomorphicFetch = __webpack_require__(12);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _es6Promise = __webpack_require__(14);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betSeed = __webpack_require__(9);
	
	var _betSeed2 = _interopRequireDefault(_betSeed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var log = new _betLogger2.default('BET:ajax:' + _betSeed2.default);
	
	exports.default = {
	  __sendBack: function __sendBack(err, value, cb) {
	    log('__sendBack');
	
	    cb({
	      err: err,
	      value: value
	    });
	  },
	  get: function get(param, cb) {
	    log('get', param);
	
	    param.method = 'get';
	    return this.ajax(param, cb);
	  },
	  post: function post(param, cb) {
	    log('get', param);
	
	    param.method = 'post';
	    this.ajax(param, cb);
	  },
	  head: function head(param, cb) {
	    log('head', param);
	
	    param.method = 'head';
	    this.ajax(param, cb);
	  },
	  ajax: function ajax(param, cb) {
	    var _this = this;
	
	    log('ajax', param);
	
	    var url = param.url;
	    var method = param.method;
	    var body = JSON.stringify(param.body || {}) || null;
	    var headers = param.headers || {};
	    var mode = param.mode || 'no-cors';
	    var credentials = param.credentials || 'omit';
	    var cache = param.cache || 'default';
	    var redirect = param.redirect || 'follow';
	
	    var parse = param.parse || 'text'; // json|text|res
	
	    (0, _isomorphicFetch2.default)(url, {
	      method: method
	      // body: body,
	      // headers: headers,
	      // mode: '',
	      // credentials: credentials,
	      // cache: cache,
	      // redirect: redirect
	    }).then(function (response) {
	      log('ajax response', response);
	
	      if (response.status !== 200) {
	        log('ajax response.status not 200', response.status);
	
	        return response;
	      }
	
	      log('ajax response parsed as', parse);
	
	      switch (parse) {
	        case 'json':
	          return response.json();
	          break;
	        case 'text':
	          return response.text();
	          break;
	        // case 'text':
	        default:
	          return response;
	          break;
	      }
	    }).then(function (data) {
	      log('ajax response parsed complite');
	
	      _this.__sendBack(null, data, cb);
	    }).catch(function (err) {
	      log('ajax err', err);
	
	      _this.__sendBack(err, null, cb);
	    });
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(13);
	module.exports = self.fetch.bind(self);

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	(function (self) {
	  'use strict';
	
	  if (self.fetch) {
	    return;
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }
	
	  function Headers(headers) {
	    this.map = {};
	
	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }
	
	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };
	
	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };
	
	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };
	
	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };
	
	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };
	
	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };
	
	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };
	
	  function Body() {
	    this.bodyUsed = false;
	
	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };
	
	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };
	
	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };
	
	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }
	
	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }
	
	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };
	
	    return this;
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }
	
	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }
	
	  Request.prototype.clone = function () {
	    return new Request(this);
	  };
	
	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }
	
	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }
	
	  Body.call(Request.prototype);
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }
	
	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }
	
	  Body.call(Response.prototype);
	
	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };
	
	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };
	
	  var redirectStatuses = [301, 302, 303, 307, 308];
	
	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }
	
	    return new Response(null, { status: status, headers: { location: url } });
	  };
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }
	
	      var xhr = new XMLHttpRequest();
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }
	
	        return;
	      }
	
	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };
	
	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };
	
	      xhr.open(request.method, request.url, true);
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }
	
	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */
	
	(function () {
	  "use strict";
	
	  function lib$es6$promise$utils$$objectOrFunction(x) {
	    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }
	
	  function lib$es6$promise$utils$$isFunction(x) {
	    return typeof x === 'function';
	  }
	
	  function lib$es6$promise$utils$$isMaybeThenable(x) {
	    return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }
	
	  var lib$es6$promise$utils$$_isArray;
	  if (!Array.isArray) {
	    lib$es6$promise$utils$$_isArray = function lib$es6$promise$utils$$_isArray(x) {
	      return Object.prototype.toString.call(x) === '[object Array]';
	    };
	  } else {
	    lib$es6$promise$utils$$_isArray = Array.isArray;
	  }
	
	  var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	  var lib$es6$promise$asap$$len = 0;
	  var lib$es6$promise$asap$$vertxNext;
	  var lib$es6$promise$asap$$customSchedulerFn;
	
	  var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	    lib$es6$promise$asap$$len += 2;
	    if (lib$es6$promise$asap$$len === 2) {
	      // If len is 2, that means that we need to schedule an async flush.
	      // If additional callbacks are queued before the queue is flushed, they
	      // will be processed by this flush that we are scheduling.
	      if (lib$es6$promise$asap$$customSchedulerFn) {
	        lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	      } else {
	        lib$es6$promise$asap$$scheduleFlush();
	      }
	    }
	  };
	
	  function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	    lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	  }
	
	  function lib$es6$promise$asap$$setAsap(asapFn) {
	    lib$es6$promise$asap$$asap = asapFn;
	  }
	
	  var lib$es6$promise$asap$$browserWindow = typeof window !== 'undefined' ? window : undefined;
	  var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	  var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	  var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	  // test for web worker but not in IE10
	  var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	  // node
	  function lib$es6$promise$asap$$useNextTick() {
	    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	    // see https://github.com/cujojs/when/issues/410 for details
	    return function () {
	      process.nextTick(lib$es6$promise$asap$$flush);
	    };
	  }
	
	  // vertx
	  function lib$es6$promise$asap$$useVertxTimer() {
	    return function () {
	      lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	    };
	  }
	
	  function lib$es6$promise$asap$$useMutationObserver() {
	    var iterations = 0;
	    var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	    var node = document.createTextNode('');
	    observer.observe(node, { characterData: true });
	
	    return function () {
	      node.data = iterations = ++iterations % 2;
	    };
	  }
	
	  // web worker
	  function lib$es6$promise$asap$$useMessageChannel() {
	    var channel = new MessageChannel();
	    channel.port1.onmessage = lib$es6$promise$asap$$flush;
	    return function () {
	      channel.port2.postMessage(0);
	    };
	  }
	
	  function lib$es6$promise$asap$$useSetTimeout() {
	    return function () {
	      setTimeout(lib$es6$promise$asap$$flush, 1);
	    };
	  }
	
	  var lib$es6$promise$asap$$queue = new Array(1000);
	  function lib$es6$promise$asap$$flush() {
	    for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
	      var callback = lib$es6$promise$asap$$queue[i];
	      var arg = lib$es6$promise$asap$$queue[i + 1];
	
	      callback(arg);
	
	      lib$es6$promise$asap$$queue[i] = undefined;
	      lib$es6$promise$asap$$queue[i + 1] = undefined;
	    }
	
	    lib$es6$promise$asap$$len = 0;
	  }
	
	  function lib$es6$promise$asap$$attemptVertx() {
	    try {
	      var r = require;
	      var vertx = __webpack_require__(17);
	      lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	      return lib$es6$promise$asap$$useVertxTimer();
	    } catch (e) {
	      return lib$es6$promise$asap$$useSetTimeout();
	    }
	  }
	
	  var lib$es6$promise$asap$$scheduleFlush;
	  // Decide what async method to use to triggering processing of queued callbacks:
	  if (lib$es6$promise$asap$$isNode) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	  } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	  } else if (lib$es6$promise$asap$$isWorker) {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	  } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	  } else {
	    lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	  }
	  function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	    var parent = this;
	    var state = parent._state;
	
	    if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	      return this;
	    }
	
	    var child = new this.constructor(lib$es6$promise$$internal$$noop);
	    var result = parent._result;
	
	    if (state) {
	      var callback = arguments[state - 1];
	      lib$es6$promise$asap$$asap(function () {
	        lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	      });
	    } else {
	      lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	    }
	
	    return child;
	  }
	  var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	  function lib$es6$promise$promise$resolve$$resolve(object) {
	    /*jshint validthis:true */
	    var Constructor = this;
	
	    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
	      return object;
	    }
	
	    var promise = new Constructor(lib$es6$promise$$internal$$noop);
	    lib$es6$promise$$internal$$resolve(promise, object);
	    return promise;
	  }
	  var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	
	  function lib$es6$promise$$internal$$noop() {}
	
	  var lib$es6$promise$$internal$$PENDING = void 0;
	  var lib$es6$promise$$internal$$FULFILLED = 1;
	  var lib$es6$promise$$internal$$REJECTED = 2;
	
	  var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	  function lib$es6$promise$$internal$$selfFulfillment() {
	    return new TypeError("You cannot resolve a promise with itself");
	  }
	
	  function lib$es6$promise$$internal$$cannotReturnOwn() {
	    return new TypeError('A promises callback cannot return that same promise.');
	  }
	
	  function lib$es6$promise$$internal$$getThen(promise) {
	    try {
	      return promise.then;
	    } catch (error) {
	      lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	      return lib$es6$promise$$internal$$GET_THEN_ERROR;
	    }
	  }
	
	  function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	    try {
	      then.call(value, fulfillmentHandler, rejectionHandler);
	    } catch (e) {
	      return e;
	    }
	  }
	
	  function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	    lib$es6$promise$asap$$asap(function (promise) {
	      var sealed = false;
	      var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;
	        if (thenable !== value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, value);
	        }
	      }, function (reason) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;
	
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	      if (!sealed && error) {
	        sealed = true;
	        lib$es6$promise$$internal$$reject(promise, error);
	      }
	    }, promise);
	  }
	
	  function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	    if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	      lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	    } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	      lib$es6$promise$$internal$$reject(promise, thenable._result);
	    } else {
	      lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }, function (reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      });
	    }
	  }
	
	  function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	    if (maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	      lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	    } else {
	      if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	      } else if (then === undefined) {
	        lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	      } else if (lib$es6$promise$utils$$isFunction(then)) {
	        lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	      }
	    }
	  }
	
	  function lib$es6$promise$$internal$$resolve(promise, value) {
	    if (promise === value) {
	      lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	    } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	      lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	    } else {
	      lib$es6$promise$$internal$$fulfill(promise, value);
	    }
	  }
	
	  function lib$es6$promise$$internal$$publishRejection(promise) {
	    if (promise._onerror) {
	      promise._onerror(promise._result);
	    }
	
	    lib$es6$promise$$internal$$publish(promise);
	  }
	
	  function lib$es6$promise$$internal$$fulfill(promise, value) {
	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      return;
	    }
	
	    promise._result = value;
	    promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	    if (promise._subscribers.length !== 0) {
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	    }
	  }
	
	  function lib$es6$promise$$internal$$reject(promise, reason) {
	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      return;
	    }
	    promise._state = lib$es6$promise$$internal$$REJECTED;
	    promise._result = reason;
	
	    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	  }
	
	  function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	    var subscribers = parent._subscribers;
	    var length = subscribers.length;
	
	    parent._onerror = null;
	
	    subscribers[length] = child;
	    subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	    subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
	
	    if (length === 0 && parent._state) {
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	    }
	  }
	
	  function lib$es6$promise$$internal$$publish(promise) {
	    var subscribers = promise._subscribers;
	    var settled = promise._state;
	
	    if (subscribers.length === 0) {
	      return;
	    }
	
	    var child,
	        callback,
	        detail = promise._result;
	
	    for (var i = 0; i < subscribers.length; i += 3) {
	      child = subscribers[i];
	      callback = subscribers[i + settled];
	
	      if (child) {
	        lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	      } else {
	        callback(detail);
	      }
	    }
	
	    promise._subscribers.length = 0;
	  }
	
	  function lib$es6$promise$$internal$$ErrorObject() {
	    this.error = null;
	  }
	
	  var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	  function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	    try {
	      return callback(detail);
	    } catch (e) {
	      lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	      return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	    }
	  }
	
	  function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	    var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	        value,
	        error,
	        succeeded,
	        failed;
	
	    if (hasCallback) {
	      value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	      if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	        failed = true;
	        error = value.error;
	        value = null;
	      } else {
	        succeeded = true;
	      }
	
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	        return;
	      }
	    } else {
	      value = detail;
	      succeeded = true;
	    }
	
	    if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	      // noop
	    } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	  }
	
	  function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	    try {
	      resolver(function resolvePromise(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }, function rejectPromise(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      });
	    } catch (e) {
	      lib$es6$promise$$internal$$reject(promise, e);
	    }
	  }
	
	  function lib$es6$promise$promise$all$$all(entries) {
	    return new lib$es6$promise$enumerator$$default(this, entries).promise;
	  }
	  var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	  function lib$es6$promise$promise$race$$race(entries) {
	    /*jshint validthis:true */
	    var Constructor = this;
	
	    var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	    if (!lib$es6$promise$utils$$isArray(entries)) {
	      lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	      return promise;
	    }
	
	    var length = entries.length;
	
	    function onFulfillment(value) {
	      lib$es6$promise$$internal$$resolve(promise, value);
	    }
	
	    function onRejection(reason) {
	      lib$es6$promise$$internal$$reject(promise, reason);
	    }
	
	    for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	      lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	    }
	
	    return promise;
	  }
	  var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	  function lib$es6$promise$promise$reject$$reject(reason) {
	    /*jshint validthis:true */
	    var Constructor = this;
	    var promise = new Constructor(lib$es6$promise$$internal$$noop);
	    lib$es6$promise$$internal$$reject(promise, reason);
	    return promise;
	  }
	  var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	  var lib$es6$promise$promise$$counter = 0;
	
	  function lib$es6$promise$promise$$needsResolver() {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }
	
	  function lib$es6$promise$promise$$needsNew() {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }
	
	  var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	  /**
	    Promise objects represent the eventual result of an asynchronous operation. The
	    primary way of interacting with a promise is through its `then` method, which
	    registers callbacks to receive either a promise's eventual value or the reason
	    why the promise cannot be fulfilled.
	     Terminology
	    -----------
	     - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	    - `thenable` is an object or function that defines a `then` method.
	    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	    - `exception` is a value that is thrown using the throw statement.
	    - `reason` is a value that indicates why a promise was rejected.
	    - `settled` the final resting state of a promise, fulfilled or rejected.
	     A promise can be in one of three states: pending, fulfilled, or rejected.
	     Promises that are fulfilled have a fulfillment value and are in the fulfilled
	    state.  Promises that are rejected have a rejection reason and are in the
	    rejected state.  A fulfillment value is never a thenable.
	     Promises can also be said to *resolve* a value.  If this value is also a
	    promise, then the original promise's settled state will match the value's
	    settled state.  So a promise that *resolves* a promise that rejects will
	    itself reject, and a promise that *resolves* a promise that fulfills will
	    itself fulfill.
	      Basic Usage:
	    ------------
	     ```js
	    var promise = new Promise(function(resolve, reject) {
	      // on success
	      resolve(value);
	       // on failure
	      reject(reason);
	    });
	     promise.then(function(value) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	     Advanced Usage:
	    ---------------
	     Promises shine when abstracting away asynchronous interactions such as
	    `XMLHttpRequest`s.
	     ```js
	    function getJSON(url) {
	      return new Promise(function(resolve, reject){
	        var xhr = new XMLHttpRequest();
	         xhr.open('GET', url);
	        xhr.onreadystatechange = handler;
	        xhr.responseType = 'json';
	        xhr.setRequestHeader('Accept', 'application/json');
	        xhr.send();
	         function handler() {
	          if (this.readyState === this.DONE) {
	            if (this.status === 200) {
	              resolve(this.response);
	            } else {
	              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	            }
	          }
	        };
	      });
	    }
	     getJSON('/posts.json').then(function(json) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	     Unlike callbacks, promises are great composable primitives.
	     ```js
	    Promise.all([
	      getJSON('/posts'),
	      getJSON('/comments')
	    ]).then(function(values){
	      values[0] // => postsJSON
	      values[1] // => commentsJSON
	       return values;
	    });
	    ```
	     @class Promise
	    @param {function} resolver
	    Useful for tooling.
	    @constructor
	  */
	  function lib$es6$promise$promise$$Promise(resolver) {
	    this._id = lib$es6$promise$promise$$counter++;
	    this._state = undefined;
	    this._result = undefined;
	    this._subscribers = [];
	
	    if (lib$es6$promise$$internal$$noop !== resolver) {
	      typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	      this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	    }
	  }
	
	  lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	  lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	  lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	  lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	  lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	  lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	  lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	  lib$es6$promise$promise$$Promise.prototype = {
	    constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	       ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	       Chaining
	      --------
	       The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	       ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	       findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	       ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	       Assimilation
	      ------------
	       Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	       If the assimliated promise rejects, then the downstream promise will also reject.
	       ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	       Simple Example
	      --------------
	       Synchronous Example
	       ```javascript
	      var result;
	       try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	       Advanced Example
	      --------------
	       Synchronous Example
	       ```javascript
	      var author, books;
	       try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	       Errback Example
	       ```js
	       function foundBooks(books) {
	       }
	       function failure(reason) {
	       }
	       findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	       Promise Example;
	       ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	       @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	    then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	       ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	       // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	       // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	       @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	    'catch': function _catch(onRejection) {
	      return this.then(null, onRejection);
	    }
	  };
	  var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	  function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	    if (Array.isArray(input)) {
	      this._input = input;
	      this.length = input.length;
	      this._remaining = input.length;
	
	      this._result = new Array(this.length);
	
	      if (this.length === 0) {
	        lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate();
	        if (this._remaining === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	    }
	  }
	
	  lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () {
	    return new Error('Array Methods must be provided an Array');
	  };
	
	  lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () {
	    var length = this.length;
	    var input = this._input;
	
	    for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };
	
	  lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) {
	    var c = this._instanceConstructor;
	    var resolve = c.resolve;
	
	    if (resolve === lib$es6$promise$promise$resolve$$default) {
	      var then = lib$es6$promise$$internal$$getThen(entry);
	
	      if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === lib$es6$promise$promise$$default) {
	        var promise = new c(lib$es6$promise$$internal$$noop);
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve) {
	          resolve(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve(entry), i);
	    }
	  };
	
	  lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) {
	    var promise = this.promise;
	
	    if (promise._state === lib$es6$promise$$internal$$PENDING) {
	      this._remaining--;
	
	      if (state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }
	
	    if (this._remaining === 0) {
	      lib$es6$promise$$internal$$fulfill(promise, this._result);
	    }
	  };
	
	  lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) {
	    var enumerator = this;
	
	    lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) {
	      enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	    }, function (reason) {
	      enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	    });
	  };
	  function lib$es6$promise$polyfill$$polyfill() {
	    var local;
	
	    if (typeof global !== 'undefined') {
	      local = global;
	    } else if (typeof self !== 'undefined') {
	      local = self;
	    } else {
	      try {
	        local = Function('return this')();
	      } catch (e) {
	        throw new Error('polyfill failed because global object is unavailable in this environment');
	      }
	    }
	
	    var P = local.Promise;
	
	    if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	      return;
	    }
	
	    local.Promise = lib$es6$promise$promise$$default;
	  }
	  var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	  var lib$es6$promise$umd$$ES6Promise = {
	    'Promise': lib$es6$promise$promise$$default,
	    'polyfill': lib$es6$promise$polyfill$$default
	  };
	
	  /* global define:true module:true window: true */
	  if ("function" === 'function' && __webpack_require__(18)['amd']) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return lib$es6$promise$umd$$ES6Promise;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module !== 'undefined' && module['exports']) {
	    module['exports'] = lib$es6$promise$umd$$ES6Promise;
	  } else if (typeof this !== 'undefined') {
	    this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	  }
	
	  lib$es6$promise$polyfill$$default();
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), (function() { return this; }()), __webpack_require__(16)(module)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _betLogger = __webpack_require__(1);
	
	var _betLogger2 = _interopRequireDefault(_betLogger);
	
	var _betSeed = __webpack_require__(9);
	
	var _betSeed2 = _interopRequireDefault(_betSeed);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var log = new _betLogger2.default('BET:messanger:' + _betSeed2.default);
	
	var BetMessanger = function () {
	  function BetMessanger(appId) {
	    _classCallCheck(this, BetMessanger);
	
	    log('constructor', appId);
	
	    this.appId = appId;
	  }
	
	  _createClass(BetMessanger, [{
	    key: 'addListener',
	    value: function addListener() {
	      var _this = this;
	
	      log('addListener');
	
	      chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	        log('addListener onMsg', message, sender);
	
	        _this.sendAnswer(message, _this.appId, sendResponse);
	
	        return true;
	      });
	    }
	  }, {
	    key: 'send',
	    value: function send(msg, cb) {
	      log('send', msg);
	
	      chrome.runtime.sendMessage(null, msg, null, cb);
	    }
	  }]);
	
	  return BetMessanger;
	}();
	
	exports.default = BetMessanger;
	;

/***/ }
/******/ ]);
//# sourceMappingURL=bg.js.map
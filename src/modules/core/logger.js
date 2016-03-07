import debug from 'debug';
import {ls} from './api/chromeApi';


export default class Logger {
  constructor (seed) {
    this.seed = seed;
    return this.factory();
  }

  factory () {
    if (debug) {
      return debug(this.seed);
    }
    return this.log.bind(this);
  }

  log (...args) {
    if (ls.get('debug')) {
      console.log(this.seed, ...args);
    }
  }
};

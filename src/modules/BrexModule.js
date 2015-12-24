import debug from 'debug';





const log = debug(`Brex:Module:${window.location.hostname}`);

export default class BrexModule {

  constructor (app) {
    log('constructor');
  }

}

new BrexModule();
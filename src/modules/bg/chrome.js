import debug from 'debug';
import Brex from '../core/brex';





const log = debug('Brex:bg');


if(chrome.runtime.onMessage) {
  log('bg script start');

  var brex = new Brex({
    protocol : 'http',
    host: 'localhost:8080',
    pathToConfig: 'config.json',
    pathToModule: '',
    path: '/',
    timeout: 120000,
    errTimeout: 30000,
    pluginId: 'plugin1'
  });

  brex.load();
}

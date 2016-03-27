import Logger from 'bet-logger';
import Brex from 'bet-bg';


const log = new Logger('Brex:bg');

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

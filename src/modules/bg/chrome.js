import Brex from '../core/brex'

var brex = new Brex({
  protocol : 'http',
  host: 'localhost:8080',
  pathToConfig: 'config.json',
  pathToModule: '',
  path: '/',
  timeout: 60000,
  errTimeout: 30000,
  pluginId: 'plugin1'
});

if(chrome.runtime.onMessage) {
  brex.load();
}

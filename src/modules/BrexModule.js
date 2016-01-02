import debug from 'debug';

export default class BrexModule {
  constructor (app) {
    this.W = W;
    this.D = D;
    this.A = A;
    this.M = M;

    let mid = (this.A && this.A.talker && this.A.talker.appId) ? `${app.mid}:${this.A.talker.appId}` : app.mid;
    this.log = debug(`Brex:Module:${mid}:${window.location.hostname}`);
  }
}

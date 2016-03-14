import ISession from './isession';

export class SessionService {
  apiUrl = '/api';
  set(session:ISession) {
    sessionStorage['sessionKey'] = session.key;
    sessionStorage['sessionSecret'] = session.secret;
  }
  get() : ISession {
    return {key: sessionStorage['sessionKey'], secret: sessionStorage['sessionSecret']};
  }
  exists() : boolean {
    let session = this.get();
    return !!(session.key && session.secret);
  }
  clear() {
    delete sessionStorage['sessionKey'];
    delete sessionStorage['sessionSecret'];
    delete sessionStorage['sessionPrefs'];
  }
  private _setPrefs(prefs:any) {
    sessionStorage['sessionPrefs'] = JSON.stringify(prefs);
  }
  private _getPrefs() : any {
    return (sessionStorage['sessionPrefs']) ? JSON.parse(sessionStorage['sessionPrefs']) : {};
  }
  setPref(key:string, value:string) {
    let prefs = this._getPrefs();
    prefs[key] = value;
    this._setPrefs(prefs);
  }
  getPref(key:string) : string {
    let prefs = this._getPrefs();
    return prefs[key];
  }
}

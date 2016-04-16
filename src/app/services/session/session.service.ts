import {Injectable, EventEmitter} from 'angular2/core';

import {ISession, IUserPreferences} from '../api/api.interfaces';

@Injectable()
export default class SessionService {
  apiUrl: string = '/api';
  loggedOut: EventEmitter<string> = new EventEmitter();
  set(session: ISession) {
    sessionStorage['sessionKey'] = session.Session;
    sessionStorage['sessionSecret'] = session.Secret;
  }
  get() : ISession {
    return {Session: sessionStorage['sessionKey'], Secret: sessionStorage['sessionSecret']};
  }
  exists() : boolean {
    let session = this.get();
    return !!(session.Session && session.Secret);
  }
  clear() {
    delete sessionStorage['sessionKey'];
    delete sessionStorage['sessionSecret'];
    delete sessionStorage['sessionPrefs'];
  }
  unauthorized() {
    this.clear();
    this.loggedOut.emit('Unauthorized');
  }
  getPrefs() : IUserPreferences {
    const prefs = sessionStorage['sessionPrefs'] ? JSON.parse(sessionStorage['sessionPrefs']) : {};
    return {
      ScrobblingEnabled: !!prefs.ScrobblingEnabled
    };
  }
  setPrefs(prefs: IUserPreferences) {
    sessionStorage['sessionPrefs'] = JSON.stringify(prefs);
  }
}

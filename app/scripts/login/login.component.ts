import {Component, EventEmitter, Output} from 'angular2/core';
import md5 from 'md5';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import ILogin from './ilogin';
import ISession from '../services/session/isession';
import ApiFactory from '../services/api/api.factory';

@Component({
  selector: 'am-login',
  templateUrl: 'scripts/login/login.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {
  model: ILogin = {username: '', password: ''};
  @Output() loginFail: EventEmitter<string> = new EventEmitter();
  @Output() loginSuccess: EventEmitter<ISession> = new EventEmitter();
  constructor(params: RouteParams) {
    let auth = params.get('auth');
    let token = params.get('token');
    if (auth && token) {
      this._getSession(auth, token);
    }
  }
  login() {
    ApiFactory.session.getToken().then((data) => {
      let authString = this._getAuthString(this.model.username, this.model.password, data.Token);
      this._getSession(data.Token, authString);
    }, () => {
      this.loginFail.emit('GetToken request failed');
    });
  }
  private _getAuthString(username:string, password: string, token:string) {
    let pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
    return md5(token + ':' + username + ':' + pswdHash + ':' + token);
  }
  private _getSession(token, authString) {
    ApiFactory.session.getSession(token, authString).then((data) => {
      this.loginSuccess.emit({key: data.Session, secret: data.Secret});
    }, () => {
      this.loginFail.emit('GetSession request failed');
    })
  }
}

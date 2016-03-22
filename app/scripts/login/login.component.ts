import {Component, EventEmitter, Output} from 'angular2/core';
import md5 from 'blueimp-md5';
import {RouteParams} from 'angular2/router';

import ILogin from './ilogin';
import ISession from '../services/session/isession';
import ApiService from '../services/api/api.service';
import ErrorService from '../services/error/error.service';

@Component({
  selector: 'am-login',
  templateUrl: 'app/scripts/login/login.html',
  providers: [ApiService]
})
export default class LoginComponent {
  model: ILogin = {username: '', password: ''};
  @Output() loginFail: EventEmitter<string> = new EventEmitter();
  @Output() loginSuccess: EventEmitter<ISession> = new EventEmitter();
  constructor(private _routeParams: RouteParams,
              private _apiService: ApiService,
              private _errorService: ErrorService) {
    const auth = this._routeParams.get('auth');
    const token = this._routeParams.get('token');
    if (auth && token) {
      this._getSession(auth, token);
    }
  }
  login() {
    this._apiService.getAuthToken().subscribe(
      (data) => {
        const authString = this._getAuthString(this.model.username, this.model.password, data.Token);
        this._getSession(data.Token, authString);
      },
      () => {
        this._errorService.showError('Login Failed!');
      }
    );
  }
  private _getAuthString(username:string, password: string, token:string) {
    const pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
    return md5(token + ':' + username + ':' + pswdHash + ':' + token);
  }
  private _getSession(token:string, auth:string) {
    this._apiService.getAuthSession(token, auth).subscribe(
      (data) => {
        this.loginSuccess.emit(data);
      },
      () => {
        this._errorService.showError('Login Failed!');
      }
    );
  }
}

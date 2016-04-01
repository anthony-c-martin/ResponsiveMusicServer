import {Component, Output} from 'angular2/core';
import * as md5 from 'blueimp-md5';
import {Router, RouteParams} from 'angular2/router';

import ISession from '../services/session/isession';
import ApiService from '../services/api/api.service';
import ErrorService from '../services/error/error.service';
import SessionService from '../services/session/session.service';

@Component({
  selector: 'am-login',
  template: require('./login.html'),
  providers: [ApiService, SessionService]
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _apiService: ApiService,
              private _errorService: ErrorService,
              private _sessionService: SessionService) {
    this._sessionService.clear();
    const auth = this._routeParams.get('auth');
    const token = this._routeParams.get('token');
    if (auth && token) {
      this._getSession(auth, token);
    }
  }
  login() {
    this._apiService.getAuthToken().subscribe(
      (data) => {
        const authString = this._getAuthString(this.username, this.password, data.Token);
        this._getSession(data.Token, authString);
      },
      () => {
        this._errorService.showError('Login attempt failed. Please try again.');
        this.password = '';
      }
    );
  }
  private _getAuthString(username: string, password: string, token: string) {
    const pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
    return md5(token + ':' + username + ':' + pswdHash + ':' + token);
  }
  private _getSession(token: string, auth: string) {
    this._apiService.getAuthSession(token, auth).subscribe(
      (data) => {
        this._sessionService.set(data);
        this._router.navigate(['Music']);
      },
      () => {
        this._errorService.showError('Login attempt failed. Please try again.');
        this.password = '';
      }
    );
  }
}

import {Component, Output} from '@angular/core';
import * as md5 from 'blueimp-md5';
import {Router, ActivatedRoute} from '@angular/router';

import {ISession} from '../services/session/session.interfaces';
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
              private _activatedRoute: ActivatedRoute,
              private _apiService: ApiService,
              private _errorService: ErrorService,
              private _sessionService: SessionService) {
    this._sessionService.clear();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (params['auth'] && params['token']) {
        this._getSession(params['auth'], params['token']);
      }
    });
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
        this._router.navigate(['music']);
      },
      () => {
        this._errorService.showError('Login attempt failed. Please try again.');
        this.password = '';
      }
    );
  }
}

import md5 = require('md5');
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import SessionService from '../session/session.service';

export default class HttpRequest {
  private _params = {};
  constructor(private _http: Http, private _sessionService:SessionService, command:string) {
    this._addParam('Command', command);
  }
  bound(start:number, limit:number) : HttpRequest {
    this._addParam('Start', start);
    this._addParam('Limit', limit);
    return this;
  }
  byId(value:number) : HttpRequest {
    this._addParam('ID', value);
    return this;
  }
  byString(value:string) : HttpRequest {
    this._addParam('String', value);
    return this;
  }
  addAuth(token:string, auth:string) {
    this._addParam('Token', token);
    this._addParam('Authentication', auth);
    return this;
  }
  submitNoAuth() : Observable<any> {
    return this._submit(false);
  }
  submitAuth() : Observable<any> {
    return this._submit(true);
  }
  private _submit(auth:boolean) : Observable<any> {
    if (auth) {
      this._addParam('Session', this._sessionService.get().Session);
    }
    this._addParam('Signature', this._getSignature(auth));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
      .post(this._sessionService.apiUrl, JSON.stringify(this._params), {
        headers: headers
      })
      .map(response => response.json());
  }
  private _getSignature(auth: boolean) : string {
    const keys = Object.keys(this._params).sort();
    let sigString = keys.map(key => key + ':' + this._params[key] + ';').join('');
    if (auth) {
      sigString += this._sessionService.get().Secret + ';';
    }
    return md5(sigString);
  }
  private _addParam(key:string, value:string|number) {
    this._params[key] = value;
  }
}

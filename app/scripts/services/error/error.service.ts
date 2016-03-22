import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/observable';
import {Observer} from 'rxjs/observer';

@Injectable()
export default class ErrorService {
  error: Observable<string>;
  private _observer: Observer<string>;
  constructor() {
    this.error = new Observable(observer => {
      this._observer = observer;
    });
  }
  showError(error: string) {
    this._observer.next(error);
  }
  clearError() {
    this._observer.next('');
  }
}

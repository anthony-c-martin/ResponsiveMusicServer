import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export default class ErrorService {
  error: EventEmitter<string> = new EventEmitter();
  showError(error: string) {
    this.error.emit(error);
  }
  clearError() {
    this.showError('');
  }
}

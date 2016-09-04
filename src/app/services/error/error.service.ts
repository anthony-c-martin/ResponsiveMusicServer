import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export default class ErrorService {
  error: EventEmitter<string> = new EventEmitter<string>();
  showError(error: string) {
    this.error.emit(error);
  }
  clearError() {
    this.showError('');
  }
}

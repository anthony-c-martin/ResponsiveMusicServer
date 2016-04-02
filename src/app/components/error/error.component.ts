import {Component} from 'angular2/core';
import ErrorService from '../../services/error/error.service';

@Component({
  selector: 'am-error',
  template: require('./error.html'),
  styles: [require('./error.scss')]
})
export default class ErrorComponent {
  errorMsg: string = '';
  constructor(public errorService: ErrorService) {
    this.errorService.error.subscribe((error) => {
      this.errorMsg = error;
    });
  }
}

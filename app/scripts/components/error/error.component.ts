import {Component} from 'angular2/core';
import ErrorService from '../../services/error/error.service';

@Component({
  selector: 'am-error',
  templateUrl: 'app/scripts/components/error/error.html'
})
export default class ErrorComponent {
  errorMsg: string = '';
  constructor(public errorService: ErrorService) {
    errorService.error.subscribe((error) => this.errorMsg = error);
  }
}

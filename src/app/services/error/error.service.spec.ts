import {
  it,
  inject,
  describe,
  beforeEach,
  beforeEachProviders
} from '@angular/testing';

import ErrorService from './error.service';

describe('ErrorService', () => {
  beforeEachProviders(() => [ErrorService]);
  beforeEach(inject([ErrorService], (errorService) => {
    this.errorService = errorService;
  }));

  it('should broadcast an error on showError', (done) => {
    this.errorService.error.subscribe((error) => {
      expect(error).toEqual('Help! Something bad has happened!');
      done();
    });

    this.errorService.showError('Help! Something bad has happened!');
  });

  it('should clear an error on clearError', (done) => {
    this.errorService.error.subscribe((error) => {
      expect(error).toEqual('');
      done();
    });

    this.errorService.clearError();
  });
});

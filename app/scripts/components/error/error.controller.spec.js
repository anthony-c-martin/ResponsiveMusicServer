/* jshint -W117, -W030 */
describe('app.components.error.ErrorController', function() {

  var controller;

  beforeEach(module('app.components.error'));

  beforeEach(inject(function($controller, $rootScope) {
    //TODO replace with Bard to avoid directly setting window prop
    window.$rootScope = $rootScope;
    controller = $controller('ErrorController');
  }));

  describe('initialisation', function() {
    it('should not set an error message', function() {
      expect(controller.errorMessage).toBeNull();
    });
  });

  describe('event: app.components.error.ErrorMessage', function() {
    it('should update the error message', function() {
      $rootScope.$emit('app.components.error.ErrorMessage', 'sad8fgsa8d7fg');

      expect(controller.errorMessage).toBe('sad8fgsa8d7fg');
    });
  });

  describe('event: hideDropdowns', function() {
    beforeEach(function() {
      controller.errorMessage = 'dfgoub';
    });

    it('should clear the error message', function() {
      $rootScope.$emit('hideDropdowns', 'asdfdugi');

      expect(controller.errorMessage).toBeNull();
    });

    it('should not clear the error message if the data is "error"', function() {
      $rootScope.$emit('hideDropdowns', 'error');

      expect(controller.errorMessage).not.toBeNull();
    });
  });

  describe('hasError', function() {
    it('should return true if there is an error', function() {
      controller.errorMessage = 'Test Error Message';

      expect(controller.hasError()).toBeTruthy();
    });

    it('should return false if there is not an error', function() {
      controller.errorMessage = '';
      expect(controller.hasError()).toBeFalsy();

      controller.errorMessage = null;
      expect(controller.hasError()).toBeFalsy();
    });
  });
});

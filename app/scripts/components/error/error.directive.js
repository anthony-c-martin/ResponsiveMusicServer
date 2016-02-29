(function() {
  'use strict';

  angular.module('app.components.error')
    .directive('amError', error);

  /* @ngInject */
  function error() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'scripts/components/error/error.html',
      controller: 'ErrorController',
      controllerAs: 'vm'
    };
  }
})();

(function() {
  'use strict';

  angular.module('app.components.navbar')
    .directive('amPositionControl', positionControl);

  /* @ngInject */
  function positionControl() {
    function link(scope) {
      scope.positionChange = function($event) {
        var width = $event.currentTarget.clientWidth;
        var left = $event.offsetX;
        scope.positionUpdate(left / width);
      };
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/components/navbar/positionControl.html',
      scope: {
        positionUpdate: '=',
        currentAudio: '='
      },
      link: link
    };
  }
})();

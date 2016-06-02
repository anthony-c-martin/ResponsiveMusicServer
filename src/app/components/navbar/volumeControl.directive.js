(function() {
  'use strict';

  angular.module('app.components.navbar')
    .directive('amVolumeControl', volumeControl);

  /* @ngInject */
  function volumeControl() {
    function link(scope) {
      scope.volumeChange = function($event) {
        var height = $event.currentTarget.clientHeight;
        var bottom = height - $event.offsetY;
        scope.volumeUpdate(bottom / height);
      };
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/components/navbar/volumeControl.html',
      scope: {
        volumeUpdate: '=',
        currentAudio: '='
      },
      link: link
    };
  }

})();

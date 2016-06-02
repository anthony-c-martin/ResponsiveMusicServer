(function() {
  'use strict';

  angular.module('app.components.navbar')
    .directive('amPlaylistButton', playlistButton);

  /* @ngInject */
  function playlistButton(draggableDataService) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        draggableDataService.bindPlaylistDropEvents(element);
      }
    };
  }
})();

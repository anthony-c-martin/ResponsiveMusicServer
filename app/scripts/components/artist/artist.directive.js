(function() {
  'use strict';

  angular.module('app.components.artist')
    .directive('amArtist', artist);

  /* @ngInject */
  function artist(draggableDataService) {
    return {
      scope: {
        artist: '=amArtist'
      },
      restrict: 'A',
      replace: true,
      templateUrl: 'scripts/components/artist/artist.html',
      controller: 'ArtistController',
      controllerAs: 'vm',
      bindToController: true,
      link: linkFunction
    };

    function linkFunction(scope, element, attrs, ctrl) {
      draggableDataService.bindDragEvents(element, ctrl.artist, 'Artist', function() {
        return [ctrl.artist];
      }, function() {
        return true;
      });
    }
  }
})();

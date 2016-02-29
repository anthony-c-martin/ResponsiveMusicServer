(function() {
  'use strict';

  angular.module('app.components.artist')
    .controller('ArtistController', ArtistController);

  /* @ngInject */
  function ArtistController($scope, playerService) {
    var ctrl = this;

    function play() {
      playerService.playlist.clear();
      playerService.playlist.addTracksByArtist(ctrl.artist.ID).then(function() {
        playerService.controlHooks.nextTrack();
      });
    }

    function add() {
      playerService.playlist.addTracksByArtist(ctrl.artist.ID);
    }

    angular.extend(this, {
      play: play,
      add: add
    });
  }
})();

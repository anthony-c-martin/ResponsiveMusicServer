'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope', 'playerService',
        function ($scope, playerService) {
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

            function select() {
                $scope.$emit('selectArtist', ctrl.artist);
            }

            angular.extend(this, {
                play: play,
                add: add,
                select: select
            });
        }]);

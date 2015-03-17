'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope', 'PlayerService',
        function ($scope, PlayerService) {
            var ctrl = this;

            function play() {
                PlayerService.playlist.clear();
                PlayerService.playlist.addTracksByArtist(ctrl.artist.ID).then(function() {
                    PlayerService.controlHooks.nextTrack();
                });
            }

            function add() {
                PlayerService.playlist.addTracksByArtist(ctrl.artist.ID);
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

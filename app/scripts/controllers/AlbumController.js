'use strict';

angular.module('musicServerApp')
    .controller('AlbumController', ['$scope', 'PlayerService',
        function ($scope, PlayerService) {
            var ctrl = this;

            function play() {
                PlayerService.playlist.clear();
                PlayerService.playlist.addTracksByAlbum(ctrl.album.ID).then(function() {
                    PlayerService.controlHooks.nextTrack();
                });
            }

            function add() {
                PlayerService.playlist.addTracksByAlbum(ctrl.album.ID);
            }

            function select() {
                $scope.$emit('selectAlbum', ctrl.album);
            }

            angular.extend(this, {
                play: play,
                add: add,
                select: select
            });
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope', 'PlayerService',
        function ($scope, PlayerService) {
            function play() {
                PlayerService.playlist.clear();
                PlayerService.playlist.addTrack($scope.track);
                PlayerService.controlHooks.nextTrack();
            }

            function add() {
                PlayerService.playlist.addTrack($scope.track);
            }

            function remove() {
                PlayerService.playlist.removeTrack($scope.track);
            }

            function select($event) {
                if ($scope.trackArea) {
                    $event.stopPropagation();
                    $scope.trackArea.trackSelected($scope.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            }

            angular.extend(this, {
                play: play,
                add: add,
                remove: remove,
                select: select
            });
        }]);

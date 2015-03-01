'use strict';

angular.module('musicServerApp')
    .controller('PlayerController', ['$scope', '$rootScope', 'Playlist',
        function ($scope, $rootScope, Playlist) {
            var ctrl = this;

            $scope.playing = false;
            $scope.track = false;
            $scope.setVolume = 0.5;
            $scope.setPosition = 0;

            $rootScope.$on('StartPlaying', function() {
                ctrl.next(true);
            });

            $scope.$on('SetPosition', function($event, position) {
                $scope.setPosition = position;
            });

            function togglePause() {
                if ($scope.track) {
                    $scope.setPlaying = !$scope.playing;
                }
                else {
                    ctrl.next(true);
                }
            }

            function next(startPlaying) {
                Playlist.getTrack().then(function(track) {
                    $scope.track = track;
                    if (startPlaying) {
                        $scope.setPlaying = true;
                    }
                }, function() {
                    $scope.setPosition = 0;
                });
            }

            function prev() {
                $scope.setPosition = 0;
            }

            angular.extend(this, {
                next: next,
                prev: prev,
                togglePause: togglePause
            });

            //Temporary fix until all references to $scope.next etc have been removed elsewhere
            $scope.next = ctrl.next;
            $scope.prev = ctrl.prev;
            $scope.togglePause = ctrl.togglePause;
        }]);

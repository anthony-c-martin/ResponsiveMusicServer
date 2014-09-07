'use strict';

angular.module('musicServerApp')
    .controller('PlayerController', ['$scope', '$rootScope', 'Playlist',
        function ($scope, $rootScope, Playlist) {
            $scope.playing = false;
            $scope.track = false;
            $scope.setVolume = 0.5;
            $scope.setPosition = 0;
            $scope.showPosition = true;

            $rootScope.$on('StartPlaying', function() {
                $scope.next(true);
            });

            $scope.$on('SetPosition', function($event, position) {
                $scope.setPosition = position;
            });

            $scope.togglePause = function () {
                if ($scope.track) {
                    $scope.setPlaying = !$scope.playing;
                }
                else {
                    $scope.next(true);
                }
            };

            $scope.next = function (startPlaying) {
                Playlist.getTrack().then(function(track) {
                    $scope.track = track;
                    if (startPlaying) {
                        $scope.setPlaying = true;
                    }
                }, function() {
                    $scope.setPosition = 0;
                });
            };

            $scope.prev = function () {
                $scope.setPosition = 0;
            };
        }]);

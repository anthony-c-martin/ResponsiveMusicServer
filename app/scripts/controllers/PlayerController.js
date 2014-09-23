'use strict';

angular.module('musicServerApp')
    .controller('PlayerController', ['$scope', '$rootScope', 'Playlist',
        function ($scope, $rootScope, Playlist) {
            var _this = this;
            $scope.playing = false;
            $scope.track = false;
            $scope.setVolume = 0.5;
            $scope.setPosition = 0;

            $rootScope.$on('StartPlaying', function() {
                _this.next(true);
            });

            $scope.$on('SetPosition', function($event, position) {
                $scope.setPosition = position;
            });

            this.togglePause = function () {
                if ($scope.track) {
                    $scope.setPlaying = !$scope.playing;
                }
                else {
                    _this.next(true);
                }
            };

            this.next = function (startPlaying) {
                Playlist.getTrack().then(function(track) {
                    $scope.track = track;
                    if (startPlaying) {
                        $scope.setPlaying = true;
                    }
                }, function() {
                    $scope.setPosition = 0;
                });
            };

            this.prev = function () {
                $scope.setPosition = 0;
            };
        }]);

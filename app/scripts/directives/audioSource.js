'use strict';

angular.module('musicServerApp')
    .directive('audioSource', ['PlayerService',
        function(PlayerService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<audio src="audioCtrl.src" type="audioCtrl.type"></audio>',
                transclude: true,
                controller: 'AudioController',
                controllerAs: 'audioCtrl',
                link: function (scope, element) {
                    var audio = element[0];

                    element.on('play', function () {
                        scope.$apply(function() {
                            PlayerService.setPlaying(true);
                        });
                    });

                    element.on('pause', function () {
                        scope.$apply(function() {
                            PlayerService.setPlaying(false);
                        });
                    });

                    element.on('volumechange', function () {
                        scope.$apply(function() {
                            PlayerService.setVolume(audio.volume);
                        });
                    });

                    element.on('timeupdate', function () {
                        scope.$apply(function () {
                            if (audio.duration > 0) {
                                PlayerService.setPosition(audio.currentTime / audio.duration);
                            } else {
                                PlayerService.setPosition(0);
                            }
                        });
                    });

                    element.on('ended', function() {
                        scope.$apply(function() {
                            PlayerService.nextTrack();
                        });
                    });
                }
            };
        }]);

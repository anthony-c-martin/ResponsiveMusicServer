'use strict';

angular.module('musicServerApp')
    .directive('audioSource', ['$rootScope', 'PlayerService',
        function($rootScope, PlayerService) {
            function link(scope, element) {
                var audio = element[0];

                function onPlay() {
                    scope.$apply(function() {
                        PlayerService.trackPaused(false);
                    });
                }

                function onPause() {
                    scope.$apply(function() {
                        PlayerService.trackPaused(true);
                    });
                }

                function onVolumeChange() {
                    scope.$apply(function() {
                        PlayerService.current.volume = audio.volume;
                    });
                }

                function onTimeUpdate() {
                    scope.$apply(function () {
                        if (audio.duration > 0) {
                            PlayerService.current.position = audio.currentTime / audio.duration;
                        } else {
                            PlayerService.current.position = 0;
                        }
                    });
                }

                function onEnded() {
                    scope.$apply(function() {
                        PlayerService.current.track = null;
                        PlayerService.current.isPlaying = false;
                        PlayerService.current.position = 0;
                        PlayerService.nextTrack();
                    });
                }

                element.on('play', onPlay);
                element.on('pause', onPause);
                element.on('volumechange', onVolumeChange);
                element.on('timeupdate', onTimeUpdate);
                element.on('ended', onEnded);

                $rootScope.$on('PlayerService.volumeUpdate', function(e, volume) {
                    audio.volume = volume;
                });

                $rootScope.$on('PlayerService.positionUpdate', function(e, position) {
                    if (audio.readyState) {
                        audio.currentTime = audio.duration * position;
                    }
                });

                $rootScope.$on('PlayerService.togglePause', function() {
                    if (audio.paused && audio.readyState) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                });

                $rootScope.$on('PlayerService.audioUpdate', function(e, data) {
                    audio.src = data.src;
                    audio.type = data.type;
                });
            }

            return {
                restrict: 'A',
                link: link
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('audioSource', ['PlayerService',
        function(PlayerService) {
            function link(scope, element) {
                var audio = element[0];

                function onPlay() {
                    scope.$apply(function() {
                        PlayerService.current.isPlaying = true;
                    });
                }

                function onPause() {
                    scope.$apply(function() {
                        PlayerService.current.isPlaying = false;
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

                PlayerService.volumeUpdateCallback = function(volume) {
                    audio.volume = volume;
                };

                PlayerService.positionUpdateCallback = function(position) {
                    if (audio.readyState) {
                        audio.currentTime = audio.duration * position;
                    }
                };
                PlayerService.audioUpdateCallback = function(src, type) {
                    audio.src = src;
                    audio.type = type;
                };

                scope.$on('destroy', function() {
                    PlayerService.volumeUpdateCallback = null;
                    PlayerService.positionUpdateCallback = null;
                    PlayerService.audioUpdateCallback = null;
                });
            }

            return {
                restrict: 'A',
                link: link
            };
        }]);

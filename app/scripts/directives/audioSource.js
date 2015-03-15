'use strict';

angular.module('musicServerApp')
    .directive('audioSource', ['$rootScope', 'PlayerService',
        function($rootScope, PlayerService) {
            function link(scope, element) {
                var audio = element[0];

                function bindWithApply(bindFunction) {
                    return function() {
                        scope.$apply(bindFunction);
                    };
                }

                element.on('play', bindWithApply(function() {
                    PlayerService.audioHooks.play();
                }));

                element.on('pause', bindWithApply(function() {
                    PlayerService.audioHooks.pause();
                }));

                element.on('volumechange', bindWithApply(function() {
                    PlayerService.audioHooks.volumeChange(audio.volume);
                }));

                element.on('timeupdate', bindWithApply(function() {
                    if (audio.duration > 0) {
                        PlayerService.audioHooks.positionChange(audio.currentTime / audio.duration);
                    } else {
                        PlayerService.audioHooks.positionChange(0);
                    }
                }));

                element.on('ended', bindWithApply(function() {
                    PlayerService.audioHooks.ended();
                }));

                $rootScope.$on('PlayerService.volumeUpdate', function(e, volume) {
                    audio.volume = volume;
                });

                $rootScope.$on('PlayerService.positionUpdate', function(e, position) {
                    if (audio.readyState) {
                        audio.currentTime = audio.duration * position;
                    }
                });

                $rootScope.$on('PlayerService.play', function() {
                    audio.play();
                });

                $rootScope.$on('PlayerService.pause', function() {
                    audio.pause();
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

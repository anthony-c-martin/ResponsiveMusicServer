'use strict';

angular.module('musicServerApp')
    .directive('audioPlayer', ['SessionData', 'ApiRequest', 'TrackTimer',
        function (SessionData, ApiRequest, TrackTimer) {
            function getSourceParams(track) {
                var params = '?FileName=' + encodeURIComponent(track.FileName);
                params += '&Session=' + encodeURIComponent(SessionData.getSession().Key);

                return params;
            }

            return {
                restrict: 'E',
                replace: true,
                template: '<audio></audio>',
                transclude: true,
                link: function (scope, element) {
                    scope.playing = false;
                    var scrobbleTimer = new TrackTimer();

                    var audio = element[0];
                    scope.$watch('track', function (track) {
                        element.empty();
                        if (track && track.FileName) {
                            element.append(angular.element('<source/>').attr({
                                src: '/stream' + getSourceParams(track),
                                type: 'audio/mp4'
                            }));
                            audio.play();

                            if (scope.scrobblingEnabled) {
                                ApiRequest.track.lastFMNowPlaying(track.ID).submit();
                                scrobbleTimer.reset(function() {
                                    if (track === scope.track) {
                                        ApiRequest.track.lastFMScrobble(track.ID).submit();
                                    }
                                }, track.Duration/2 < 240 ? track.Duration/2 : 240);
                            }
                        }
                    });

                    scope.$watch('setPlaying', function (setPlaying) {
                        if (setPlaying) {
                            audio.play();
                        } else {
                            audio.pause();
                        }
                    });

                    scope.$watch('setVolume', function (volume) {
                        audio.volume = volume;
                    });

                    scope.$watch('setPosition', function (position) {
                        if (audio.readyState) {
                            audio.currentTime = audio.duration * position;
                        }
                    });

                    element.on('play', function () {
                        scope.$apply(function() {
                            scope.playing = true;
                        });
                        scrobbleTimer.resume();
                    });

                    element.on('pause', function () {
                        scope.$apply(function() {
                            scope.playing = false;
                        });
                        scrobbleTimer.pause();
                    });

                    element.on('volumechange', function () {
                        scope.$apply(function() {
                            scope.volume = audio.volume;
                        });
                    });

                    element.on('timeupdate', function () {
                        scope.$apply(function () {
                            if (audio.duration > 0) {
                                scope.position = audio.currentTime / audio.duration;
                            } else {
                                scope.position = 0;
                            }
                        });
                    });

                    element.on('ended', function() {
                        scrobbleTimer.cancel();
                        scope.track = false;
                        scope.next();
                    });
                }
            };
        }]);

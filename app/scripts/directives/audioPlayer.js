'use strict';

angular.module('musicServerApp')
    .directive('audioPlayer', ['SessionData', 'TrackRequest',
        function (SessionData, TrackRequest) {
            function trackTimer() {
                function timerTick() {
                    if (!_paused && ++_counter > _duration) {
                        clearInterval(_intervalTimer);
                        _callback();
                        timerCancel();
                    }
                }

                function timerCancel() {
                    clearInterval(_intervalTimer);
                    _callback = false;
                    _duration = 0;
                    _counter = 0;
                    _paused = true;
                }

                var _callback;
                var _duration;
                var _counter;
                var _paused;
                var _intervalTimer;

                return {
                    reset: function(callback, duration) {
                        timerCancel();
                        _paused = false;
                        _counter = 0;
                        _callback = callback;
                        _duration = duration;
                        _intervalTimer = setInterval(timerTick, 1000);
                    },
                    cancel: function() {
                        timerCancel();
                    },
                    pause: function() {
                        _paused = true;
                    },
                    resume: function() {
                        _paused = false;
                    }
                };
            }

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
                    var scrobbleTimer = trackTimer();

                    var audio = element[0];
                    scope.$watch('track', function (track) {
                        element.empty();
                        if (track.FileName) {
                            element.append($('<source/>').attr({
                                src: '/stream' + getSourceParams(track),
                                type: 'audio/mp4'
                            }));
                            audio.play();

                            if (scope.scrobblingEnabled) {
                                TrackRequest.lastFMNowPlaying(track.ID).load();
                                scrobbleTimer.reset(function() {
                                    if (track === scope.track) {
                                        TrackRequest.lastFMScrobble(track.ID).load();
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

'use strict';

angular.module('musicServerApp')
    .factory('TrackTimer', [
        function() {
            return function () {
                var _callback;
                var _duration;
                var _counter;
                var _paused;
                var _intervalTimer;

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
            };
        }]);

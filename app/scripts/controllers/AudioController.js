'use strict';

angular.module('musicServerApp')
    .controller('AudioController', ['PlayerService', 'SessionData',
        function(PlayerService, SessionData) {
            var ctrl = this;

            function getSourceParams(track) {
                var params = '?FileName=' + encodeURIComponent(track.FileName);
                params += '&Session=' + encodeURIComponent(SessionData.getSession().Key);

                return params;
            }

            function trackChangeHandler(track) {
                ctrl.track = track;
                if(ctrl.track && ctrl.track.FileName) {
                    ctrl.src = '/stream' + getSourceParams(track);
                    ctrl.type = 'audio/mp4';
                } else {
                    ctrl.src = '';
                    ctrl.type = '';
                }
            }

            function playingChangeHandler(isPlaying) {
                ctrl.isPlaying = isPlaying;
            }

            function volumeChangeHandler(volume) {
                ctrl.volume = volume;
            }

            function positionChangeHandler(position) {
                ctrl.position = position;
            }

            PlayerService.on('trackChange', trackChangeHandler);
            PlayerService.on('playingChange', playingChangeHandler);
            PlayerService.on('volumeChange', volumeChangeHandler);
            PlayerService.on('positionChange', positionChangeHandler);

            angular.extend(this, {
                track: null,
                isPlaying: false,
                volume: 0.5,
                position: 0,
                src: '',
                type: ''
            });
        }]);

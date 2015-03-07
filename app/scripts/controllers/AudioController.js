'use strict';

angular.module('musicServerApp')
    .controller('AudioController', ['PlayerService', '$rootScope',
        function(PlayerService, $rootScope) {
            var ctrl = this;

            function togglePause() {
                PlayerService.togglePause();
            }

            function nextTrack() {
                PlayerService.nextTrack();
            }

            function previousTrack() {
                PlayerService.previousTrack();
            }

            function volumeUpdate(volume) {
                PlayerService.volumeUpdate(volume);
            }

            function positionUpdate(position) {
                PlayerService.positionUpdate(position);
            }

            $rootScope.$on('hideDropdowns', function(e, data) {
                if (!(data && data === 'volume')) {
                    ctrl.volumeShown = false;
                }
            });

            angular.extend(this, {
                volumeShown: false,
                togglePause: togglePause,
                nextTrack: nextTrack,
                previousTrack: previousTrack,
                audio: PlayerService.current,
                volumeUpdate: volumeUpdate,
                positionUpdate: positionUpdate
            });
        }]);

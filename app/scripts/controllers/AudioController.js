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

            function prevTrack() {
                PlayerService.prevTrack();
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
                prevTrack: prevTrack,
                audio: PlayerService.current,
                volumeUpdate: volumeUpdate,
                positionUpdate: positionUpdate
            });
        }]);

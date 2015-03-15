'use strict';

angular.module('musicServerApp')
    .controller('AudioController', ['PlayerService', '$rootScope',
        function(PlayerService, $rootScope) {
            var ctrl = this;

            //TODO wrap all the hideDropdowns functionality in a directive
            $rootScope.$on('hideDropdowns', function(e, data) {
                if (!(data && data === 'volume')) {
                    ctrl.volumeShown = false;
                }
            });

            angular.extend(this, {
                volumeShown: false,
                togglePause: PlayerService.controlHooks.togglePause.bind(null),
                nextTrack: PlayerService.controlHooks.nextTrack.bind(null),
                previousTrack: PlayerService.controlHooks.previousTrack.bind(null),
                volumeUpdate: PlayerService.controlHooks.volumeUpdate.bind(null),
                positionUpdate: PlayerService.controlHooks.positionUpdate.bind(null),
                current: PlayerService.current
            });
        }]);

(function() {
    'use strict';

    angular.module('app.components.navbar')
        .controller('NavbarController', NavbarController);

    /* @ngInject */
    function NavbarController(playerService, $rootScope, sessionService) {
        var ctrl = this;

        function togglePause() {
            playerService.controlHooks.togglePause();
        }

        function nextTrack() {
            playerService.controlHooks.nextTrack();
        }

        function previousTrack() {
            playerService.controlHooks.previousTrack();
        }

        function volumeUpdate(volume) {
            playerService.controlHooks.volumeUpdate(volume);
        }

        function positionUpdate(position) {
            playerService.controlHooks.positionUpdate(position);
        }

        function toggleScrobblingEnabled() {
            ctrl.scrobblingEnabled = !ctrl.scrobblingEnabled;
            sessionService.setUserPreference('ScrobblingEnabled', ctrl.scrobblingEnabled);
        }

        //TODO wrap all the hideDropdowns functionality in a directive
        $rootScope.$on('hideDropdowns', function(e, data) {
            if (!(data && data === 'volume')) {
                ctrl.volumeShown = false;
            }
        });

        angular.extend(this, {
            scrobblingEnabled: sessionService.getUserPreference('ScrobblingEnabled'),
            toggleScrobblingEnabled: toggleScrobblingEnabled,
            volumeShown: false,
            togglePause: togglePause,
            nextTrack: nextTrack,
            previousTrack: previousTrack,
            current: playerService.current,
            volumeUpdate: volumeUpdate,
            positionUpdate: positionUpdate
        });
    }
})();

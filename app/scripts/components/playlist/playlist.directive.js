(function() {
    'use strict';

    angular.module('app.components.playlist')
        .directive('amPlaylist', playlist);

    /* @ngInject */
    function playlist($rootScope) {
        return {
            link: function(scope, element, attrs, ctrl) {
                $rootScope.$on('hideDropdowns', function(e, data) {
                    if (!(data && data === 'playlist')) {
                        ctrl.playlistShown = false;
                    }
                });
            },
            scope: {},
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/components/playlist/playlist.html',
            controller: 'PlaylistController',
            controllerAs: 'vm'
        };
    }
})();

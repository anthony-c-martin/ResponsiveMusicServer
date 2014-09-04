'use strict';

angular.module('musicServerApp')
    .directive('playlist', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'playlist')) {
                            scope.playlistShown = false;
                            element.hide();
                        }
                    });

                    scope.togglePlaylistHandler = function() {
                        scope.playlistShown = !scope.playlistShown;
                        element.toggle(scope.playlistShown);
                    };
                },
                restrict: 'E',
                replace: true,
                controller: 'PlaylistController',
                templateUrl: 'playlist.partial.html'
            };
        }]);

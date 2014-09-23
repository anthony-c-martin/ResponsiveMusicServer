'use strict';

angular.module('musicServerApp')
    .directive('playlist', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope) {
                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'playlist')) {
                            scope.playlistShown = false;
                        }
                    });
                },
                restrict: 'E',
                replace: true,
                controller: 'PlaylistController as playlistCtrl',
                templateUrl: 'views/playlist.partial.html'
            };
        }]);

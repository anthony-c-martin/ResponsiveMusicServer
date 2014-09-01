'use strict';

angular.module('musicServerApp')
    .directive('playlist', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function() {
                        element.hide();
                    });

                    scope.togglePlaylistHandler = function(toggle) {
                        element.toggle(toggle);
                    };
                },
                restrict: 'E',
                replace: true,
                controller: 'PlaylistController',
                templateUrl: 'playlist.partial.html'
            };
        }]);

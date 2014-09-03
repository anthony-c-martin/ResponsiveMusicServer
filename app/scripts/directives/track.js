'use strict';

angular.module('musicServerApp')
    .directive('track', ['$rootScope',
        function($rootScope) {
            function linkFunction(scope, element, attrs) {
                scope.addable = true;

                if (attrs.playlistTrack) {
                    scope.closable = true;
                    scope.addable = false;
                }

                scope.play = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('playTrack', scope.track);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('addTrack', scope.track);
                };

                scope.remove = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('removeTrack', scope.track);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                link: linkFunction
            };
        }]);

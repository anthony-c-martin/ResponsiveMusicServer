'use strict';

angular.module('musicServerApp')
    .directive('track', [

        function() {
            function linkFunction(scope) {
                scope.play = function() {
                    scope.$emit('playTrack', scope.track);
                };
                scope.add = function() {
                    scope.$emit('addTrack', scope.track);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                link: linkFunction
            };
        }
    ]);

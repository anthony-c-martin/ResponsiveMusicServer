'use strict';

angular.module('musicServerApp')
    .directive('artist', [

        function() {
            function linkFunction(scope) {
                scope.play = function() {
                    scope.$emit('playArtist', scope.artist);
                };
                scope.add = function() {
                    scope.$emit('addArtist', scope.artist);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                link: linkFunction
            };
        }
    ]);

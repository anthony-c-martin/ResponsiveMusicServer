'use strict';

angular.module('musicServerApp')
    .directive('artist', [
        function() {
            function linkFunction(scope) {
                scope.play = function($event) {
                    $event.stopPropagation();
                    scope.$emit('playArtist', scope.artist);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    scope.$emit('addArtist', scope.artist);
                };

                scope.select = function() {
                    scope.$emit('selectArtist', scope.artist);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                link: linkFunction
            };
        }]);

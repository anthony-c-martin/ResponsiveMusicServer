'use strict';

angular.module('musicServerApp')
    .directive('artist', ['$rootScope',
        function($rootScope) {
            function linkFunction(scope) {
                scope.play = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('playArtist', scope.artist);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('addArtist', scope.artist);
                };

                scope.select = function() {
                    $rootScope.$emit('selectArtist', scope.artist);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                link: linkFunction
            };
        }]);

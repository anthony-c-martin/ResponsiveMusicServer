'use strict';

angular.module('musicServerApp')
    .directive('album', [
        function() {
            function linkFunction(scope) {
                scope.play = function($event) {
                    $event.stopPropagation();
                    scope.$emit('playAlbum', scope.album);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    scope.$emit('addAlbum', scope.album);
                };

                scope.select = function() {
                    scope.$emit('selectAlbum', scope.album);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album.partial.html',
                link: linkFunction
            };
        }]);

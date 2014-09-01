'use strict';

angular.module('musicServerApp')
    .directive('album', [
        function() {
            function linkFunction(scope) {
                /*
                var index = '' + (element.index() * 2);
                element.css('webkit-order', index);
                element.css('order', index);
                */
                scope.play = function() {
                    scope.$emit('playAlbum', scope.album);
                };
                scope.add = function() {
                    scope.$emit('addAlbum', scope.album);
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album.partial.html',
                link: linkFunction
            };
        }]);

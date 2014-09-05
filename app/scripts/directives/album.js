'use strict';

angular.module('musicServerApp')
    .directive('album', ['DraggableData',
        function(DraggableData) {
            function linkFunction(scope, element) {
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

                DraggableData.bindDragEvents(element, scope.album, 'Album', function() {
                    return [scope.album];
                }, function() {
                    return true;
                });
            }

            return {
                scope: {
                    'album': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album.partial.html',
                link: linkFunction
            };
        }]);

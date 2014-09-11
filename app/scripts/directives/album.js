'use strict';

angular.module('musicServerApp')
    .directive('album', ['DraggableData',
        function(DraggableData) {
            return {
                scope: {
                    'album': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album.partial.html',
                controller: 'AlbumController',
                link: function(scope, element) {
                    DraggableData.bindDragEvents(element, scope.album, 'Album', function() {
                        return [scope.album];
                    }, function() {
                        return true;
                    });
                }
            };
        }]);

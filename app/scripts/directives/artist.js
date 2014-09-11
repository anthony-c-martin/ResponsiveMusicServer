'use strict';

angular.module('musicServerApp')
    .directive('artist', ['DraggableData',
        function(DraggableData) {
            return {
                scope: {
                    'artist': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                controller: 'ArtistController',
                link: function(scope, element) {
                    DraggableData.bindDragEvents(element, scope.artist, 'Artist', function() {
                        return [scope.artist];
                    }, function() {
                        return true;
                    });
                }
            };
        }]);

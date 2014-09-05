'use strict';

angular.module('musicServerApp')
    .directive('artist', ['$rootScope', 'DraggableData',
        function($rootScope, DraggableData) {
            function linkFunction(scope, element) {
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

                DraggableData.bindDragEvents(element, scope.artist, 'Artist', function() {
                    return [scope.artist];
                }, function() {
                    return true;
                });
            }

            return {
                scope: {
                    'artist': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                link: linkFunction
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('track', ['$rootScope', 'DraggableData',
        function($rootScope, DraggableData) {
            function linkFunction(scope, element, attrs) {
                scope.addable = true;

                if (attrs.playlistTrack) {
                    scope.closable = true;
                    scope.addable = false;
                }

                scope.play = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('playTrack', scope.track);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('addTrack', scope.track);
                };

                scope.remove = function($event) {
                    $event.stopPropagation();
                    $rootScope.$emit('removeTrack', scope.track);
                };

                scope.select = function($event) {
                    if (scope.trackArea) {
                        $event.stopPropagation();
                        scope.trackArea.trackSelected(scope.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                    }
                };

                DraggableData.bindDragEvents(element, scope.track, 'Track', function() {
                    if (scope.trackArea) {
                        return scope.trackArea.listTracks();
                    }
                    return [scope.track];
                }, function() {
                    if (scope.trackArea) {
                        return scope.track.selected;
                    }
                    return true;
                });
            }

            return {
                scope: {
                    'track': '=',
                    'trackArea': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                link: linkFunction
            };
        }]);

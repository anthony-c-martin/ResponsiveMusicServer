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

                scope.selectTrack = function(e) {
                    e.stopPropagation();
                    scope.trackArea.trackSelected(scope[attrs.selectable], e.shiftKey, (e.ctrlKey || e.metaKey));
                };

                element.on('dragstart', function(e) {
                    if (!scope[attrs.selectable].selected) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    $('.dropdown-playlist-container').addClass('button-highlighted');

                    e.originalEvent.dataTransfer.setDragImage(DraggableData.getDragImage(), -10, -10);
                    DraggableData.setTracks(scope.trackArea.listTracks());
                });

                element.on('dragend', function() {
                    DraggableData.clear();
                    $('.dropdown-playlist-container').removeClass('button-highlighted');
                });
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                link: linkFunction
            };
        }]);

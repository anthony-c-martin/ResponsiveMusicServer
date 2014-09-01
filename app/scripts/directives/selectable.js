'use strict';

angular.module('musicServerApp')
    .directive('selectable', ['$compile', 'DraggableData',
    function ($compile, DraggableData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.attr('draggable', true);

                scope.selectTrack = function(e) {
                    e.stopPropagation();
                    scope.area.trackSelected(scope[attrs.selectable], e.shiftKey, (e.ctrlKey || e.metaKey));
                };

                element.on('dragstart', function(e) {
                    if (!scope[attrs.selectable].selected) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    $('.dropdown-playlist-container').addClass('button-highlighted');

                    e.originalEvent.dataTransfer.setDragImage(DraggableData.getDragImage(), -10, -10);
                    DraggableData.setTracks(scope.area.listTracks());
                });

                element.on('dragend', function() {
                    DraggableData.clear();
                    $('.dropdown-playlist-container').removeClass('button-highlighted');
                });
            }
        };
    }]);

'use strict';

angular.module('musicServerApp')
    .directive('selectableAlbum', ['DraggableData',
        function(DraggableData) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    element.attr('draggable', true);
                    element.on('dragstart', function(e) {
                        $('.dropdown-playlist-container').addClass('button-highlighted');

                        e.originalEvent.dataTransfer.setDragImage(DraggableData.getDragImage(), -10, -10);
                        DraggableData.setAlbum(scope.album);
                    });

                    element.on('dragend', function() {
                        DraggableData.clear();
                        $('.dropdown-playlist-container').removeClass('button-highlighted');
                    });
                }
            };
        }]);

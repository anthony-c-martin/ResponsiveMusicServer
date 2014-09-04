'use strict';

angular.module('musicServerApp')
    .service('DraggableData', [
        function() {
            var dragEl = false;
            var currentData = false;

            this.setTracks = function(tracks) {
                currentData = tracks;
            };

            this.clear = function() {
                currentData = false;
            };

            this.getTracks = function() {
                return currentData;
            };

            this.getDragImage = function() {
                if (!dragEl) {
                    dragEl = $('<div class="btn-group btn-group-xs pull-left">' +
                        '<button type="button" class="btn btn-default btn-album-add"><span class="glyphicon glyphicon-music"></span></button>' +
                        '</div>')[0];
                    dragEl.setAttribute('style', 'position: absolute; display: block; top: -500; left: -500;');
                    document.body.appendChild(dragEl);
                }
                return dragEl;
            };
        }]);

'use strict';

angular.module('musicServerApp')
        .directive('playlistButton', ['DraggableData',
        function(DraggableData) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    DraggableData.bindDropEvents(element);
                }
            };
        }]);

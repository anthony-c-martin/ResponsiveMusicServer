'use strict';

angular.module('musicServerApp')
    .directive('dragImage', ['DraggableData',
        function(DraggableData) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    DraggableData.getDragElement = function(itemCount, itemType) {
                        element.text('' + itemCount + ' ' + itemType + ((itemCount > 1) ? 's' : ''));
                        return element[0];
                    };
                }
            };
        }]);

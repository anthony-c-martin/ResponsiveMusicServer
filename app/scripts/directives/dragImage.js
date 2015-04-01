'use strict';

angular.module('musicServerApp')
    .directive('dragImage', ['draggableDataService',
        function(draggableDataService) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    draggableDataService.getDragElement = function(itemCount, itemType) {
                        element.text('' + itemCount + ' ' + itemType + ((itemCount > 1) ? 's' : ''));
                        return element[0];
                    };
                }
            };
        }]);

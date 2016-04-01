(function() {
  'use strict';

  angular.module('app.components.misc')
    .directive('amDragImage', dragImage);

  /* @ngInject */
  function dragImage(draggableDataService) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        draggableDataService.getDragElement = function(itemCount, itemType) {
          element.text('' + itemCount + ' ' + itemType + ((itemCount > 1) ? 's' : ''));
          return element[0];
        };
      }
    };
  }
})();

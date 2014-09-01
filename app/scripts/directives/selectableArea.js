'use strict';

angular.module('musicServerApp')
    .directive('selectableArea', ['SelectableTracks',
    function (SelectableTracks) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.area = new SelectableTracks();
                scope.area.allTracks = scope[attrs.selectableArea];

                scope.clearSelection = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    scope.area.clearSelection();
                };
            }
        };
    }]);

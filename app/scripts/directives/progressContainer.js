'use strict';

angular.module('musicServerApp')
    .directive('progressContainer', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    scope.positionChange = function($event) {
                        var width = element.width();
                        var left = $event.clientX - element.offset().left;
                        scope.$emit('SetPosition', left/width);
                    };
                }
            };
        }]);

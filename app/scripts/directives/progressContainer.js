'use strict';

angular.module('musicServerApp')
    .directive('progressContainer', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    scope.positionChange = function($event) {
                        var width = element[0].clientWidth;
                        var left = $event.clientX - element[0].offsetLeft;
                        scope.$emit('SetPosition', left/width);
                    };
                }
            };
        }]);

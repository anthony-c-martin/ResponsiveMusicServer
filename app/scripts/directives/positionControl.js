'use strict';

angular.module('musicServerApp')
    .directive('positionControl', [
        function() {
            function link(scope) {
                scope.positionChange = function($event) {
                    var width = angular.element($event.currentTarget).width();
                    var left = $event.offsetX;
                    scope.positionUpdate(left / width);
                };
            }

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'views/positionControl.partial.html',
                scope: {
                    positionUpdate: '='
                },
                link: link
            };
        }]);

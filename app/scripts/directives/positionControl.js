'use strict';

angular.module('musicServerApp')
    .directive('positionControl', [
        function() {
            function link(scope, element) {
                scope.positionChange = function($event) {
                    var width = element[0].clientWidth;
                    var left = $event.clientX - element[0].offsetLeft;
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

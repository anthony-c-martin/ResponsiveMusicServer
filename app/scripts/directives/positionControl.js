'use strict';

angular.module('musicServerApp')
    .directive('positionControl', [
        function() {
            function link(scope) {
                scope.positionChange = function($event) {
                    var width = $event.currentTarget.clientWidth;
                    var left = $event.offsetX;
                    scope.positionUpdate(left / width);
                };
            }

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'views/positionControl.partial.html',
                scope: {
                    positionUpdate: '=',
                    currentAudio: '='
                },
                link: link
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('playerContainer', [
        function() {
            return {
                restrict: 'E',
                link: function(scope) {
                    scope.positionChange = function($event) {
                        var width = $($event.currentTarget).width();
                        var left = $event.offsetX;
                        scope.setPosition = left / width;
                    };
                }
            };
        }]);

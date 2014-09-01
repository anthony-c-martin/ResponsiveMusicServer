'use strict';

angular.module('musicServerApp')
    .directive('playerContainer', [
    function() {
        return {
            restrict: 'E',
            link: function(scope) {
                scope.clickSlider = function ($event) {
                    var width = $($event.currentTarget).width();
                    var left = $event.offsetX !== undefined ? $event.offsetX : ($event.pageX - $($event.currentTarget).offset().left);
                    scope.setSlider(left / width);
                };
            }
        };
    }]);

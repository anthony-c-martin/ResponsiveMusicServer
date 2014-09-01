'use strict';

angular.module('musicServerApp')
    .directive('scrollLoader', [
        function() {
            function linkFunction(scope, element, attrs) {
                scope.$eval(attrs.scrollLoader);
                var raw = element[0];

                element.on('scroll', function () {
                    if (raw.scrollTop + (raw.offsetHeight * 2) >= raw.scrollHeight) {
                        scope.$apply(attrs.scrollLoader);
                    }
                });
            }

            return {
                restrict: 'A',
                link: linkFunction
            };
        }]);

(function() {
    'use strict';

    angular.module('app.components.misc')
        .directive('amScrollLoader', scrollLoader);

    /* @ngInject */
    function scrollLoader() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var raw = element[0];

                element.on('scroll', function () {
                    if (raw.scrollTop + (raw.offsetHeight * 2) >= raw.scrollHeight) {
                        scope.$apply(attrs.amScrollLoader);
                    }
                });
            }
        };
    }
})();

(function() {
    'use strict';

    angular.module('app.components.misc')
        .directive('amBodyEventHandler', bodyEventHandler);

    /* @ngInject */
    function bodyEventHandler($rootScope) {
        function linkFunction(scope, element, attrs) {
            element.on('click', function(e) {
                scope.$apply(function() {
                    if (attrs.amBodyEventHandler) {
                        $rootScope.$emit('hideDropdowns', attrs.amBodyEventHandler);
                        e.stopPropagation();
                    } else {
                        $rootScope.$emit('hideDropdowns');
                    }
                });
            });
        }

        return {
            restrict: 'A',
            link: linkFunction
        };
    }
})();

(function() {
    'use strict';

    angular.module('app.components.search')
        .directive('amSearch', search);

    /* @ngInject */
    function search($rootScope) {
        return {
            link: function(scope, element, attrs, ctrl) {
                $rootScope.$on('hideDropdowns', function(e, data) {
                    if (!(data && data === 'search')) {
                        ctrl.searchShown = false;
                    }
                });
            },
            scope: {},
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/components/search/search.html',
            controller: 'SearchController',
            controllerAs: 'vm'
        };
    }
})();

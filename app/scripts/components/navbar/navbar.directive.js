(function() {
    'use strict';

    angular.module('app.components.navbar')
        .directive('amNavbar', navbar);

    /* @ngInject */
    function navbar() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'scripts/components/navbar/navbar.html'
        };
    }
})();

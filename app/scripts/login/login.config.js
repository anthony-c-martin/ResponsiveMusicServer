(function() {
    'use strict';

    angular.module('app.login')
        .config(config);

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.
            state('login', {
                url: '/login?{token:string}&{auth:string}',
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'scripts/login/login.html'
            });
    }
})();

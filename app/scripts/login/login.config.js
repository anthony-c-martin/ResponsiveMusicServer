(function() {
    'use strict';

    angular.module('app.login')
        .config(config);

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.
            state('login', {
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: 'scripts/login/login.html',
            }).
            state('login.auto', {
                url: '/{token:string}/{auth:string}'
            });
    }
})();

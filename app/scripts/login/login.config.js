(function() {
    'use strict';

    angular.module('app.login')
        .config(config);

    /* @ngInject */
    function config($routeProvider) {
        $routeProvider.
            when('/login', {
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                templateUrl: 'scripts/login/login.html',
                title: 'Login'
            }).
            when('/login/:token/:auth', {
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                templateUrl: 'scripts/login/login.html',
                title: 'Login'
            });
    }
})();

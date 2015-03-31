(function() {
    'use strict';

    angular.module('app.core')
        .run(routeConfig);

    /* @ngInject */
    function routeConfig($routeProvider, matchmediaProvider) {
        $routeProvider.
            when('/login', {
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                templateUrl: 'views/login.html',
                title: 'Login'
            }).
            when('/login/:token/:auth', {
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                templateUrl: 'views/login.html',
                title: 'Login'
            }).
            when('/music', {
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                templateUrl: 'views/main.html',
                title: 'Main'
            }).
            when('/music/search/:type/:search', {
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                templateUrl: 'views/main.html',
                title: 'Main'
            }).
            otherwise({
                redirectTo: '/login'
            });

        matchmediaProvider.rules.desktop = '(min-width: 56em)';
        matchmediaProvider.rules.phone = '(max-width: 40em)';
    }
})();

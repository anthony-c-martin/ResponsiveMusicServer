(function() {
    'use strict';

    angular.module('app.main')
        .config(config);

    /* @ngInject */
    function config($routeProvider) {
        $routeProvider.
            when('/music', {
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                templateUrl: 'scripts/main/main.html',
                title: 'Main'
            }).
            when('/music/search/:type/:search', {
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                templateUrl: 'scripts/main/main.html',
                title: 'Main'
            });
    }
})();

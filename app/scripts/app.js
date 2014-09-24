'use strict';

angular
    .module('musicServerApp', [
        'musicServerApp.views',
        'ngRoute',
        'matchmedia-ng'
    ])
    .config(['matchmediaProvider',
        function(matchmediaProvider) {
            matchmediaProvider.rules.desktop = '(min-width: 56em)';
            matchmediaProvider.rules.phone = '(max-width: 40em)';
        }])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
            when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login.html',
                title: 'Login'
            }).
            when('/music', {
                controller: 'MainController',
                templateUrl: 'views/main.html',
                title: 'Main'
            }).
            otherwise({
                redirectTo: '/login'
            });
        }]);

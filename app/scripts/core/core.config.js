(function() {
    'use strict';

    angular.module('app.core')
        .config(config);

    /* @ngInject */
    function config($urlRouterProvider, matchmediaProvider) {
        $urlRouterProvider.otherwise('/login');

        matchmediaProvider.rules.desktop = '(min-width: 56em)';
        matchmediaProvider.rules.phone = '(max-width: 40em)';
    }
})();

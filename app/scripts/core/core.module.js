(function() {
    'use strict';

    angular.module('app.core', [
        'ngRoute',
        'matchmedia-ng',
        'app.services.api',
        'app.services.session',
        'app.services.playlist'
    ]);
})();

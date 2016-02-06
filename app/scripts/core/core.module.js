(function() {
    'use strict';

    angular.module('app.core', [
        'ui.router',
        'matchmedia-ng',
        'app.services.api',
        'app.services.session',
        'app.services.playlist'
    ]);
})();

(function() {
    'use strict';

    angular.module('app.music')
        .config(config);

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.
            state('music', {
                url: '/music',
                controller: 'MusicController',
                controllerAs: 'vm',
                templateUrl: 'scripts/music/music.html',
            }).
            state('music.artist', {
                url: '/{artistId:int}'
            }).
            state('music.artist.album', {
                url: '/{albumId:int}'
            }).
            state('music.search', {
                url: '/search/{type:string}/{search:string}'
            });
    }
})();

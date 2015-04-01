(function() {
    'use strict';

    angular.module('app.components.search')
        .controller('SearchController', SearchController);

    /* @ngInject */
    function SearchController($rootScope, $q, apiFactory) {
        var ctrl = this;

        var searchResults = {
            artists: [],
            albums: [],
            tracks: []
        };

        function search() {
            ctrl.inProgress = true;
            ctrl.searchShown = true;

            $q.all({
                artists: apiFactory.artist.search(ctrl.searchText).bound(0, 5).submit(),
                albums: apiFactory.album.search(ctrl.searchText).bound(0, 5).submit(),
                tracks: apiFactory.track.search(ctrl.searchText).bound(0, 5).submit()
            }).then(function(results) {
                searchResults.artists = results.artists;
                searchResults.albums = results.albums;
                searchResults.tracks = results.tracks;
                ctrl.inProgress = false;
            }, function() {
                ctrl.searchShown = false;
                ctrl.inProgress = false;
            });
        }

        function redirectToResults(type) {
            var redirect = '/music/search/' + type + '/' + encodeURIComponent(ctrl.searchText);
            $rootScope.$emit('changeLocation', redirect);
        }

        angular.extend(this, {
            inProgress: false,
            searchShown: false,
            searchResults: searchResults,
            redirectToResults: redirectToResults,
            search: search
        });
    }
})();

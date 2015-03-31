'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$rootScope', 'apiService', '$q',
        function ($rootScope, apiService, $q) {
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
                    artists: apiService.artist.search(ctrl.searchText).bound(0, 5).submit(),
                    albums: apiService.album.search(ctrl.searchText).bound(0, 5).submit(),
                    tracks: apiService.track.search(ctrl.searchText).bound(0, 5).submit()
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
                console.warn(redirect);
                $rootScope.$emit('changeLocation', redirect);
            }

            angular.extend(this, {
                inProgress: false,
                searchShown: false,
                searchResults: searchResults,
                redirectToResults: redirectToResults,
                search: search
            });
        }]);

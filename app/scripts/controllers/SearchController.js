'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$scope', 'ApiRequest', '$q',
        function ($scope, ApiRequest, $q) {
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
                    artists: ApiRequest.artist.search(ctrl.searchText).bound(0, 5).submit(),
                    albums: ApiRequest.album.search(ctrl.searchText).bound(0, 5).submit(),
                    tracks: ApiRequest.track.search(ctrl.searchText).bound(0, 5).submit()
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
                var redirect = '/' + type + '/s/' + encodeURIComponent(ctrl.searchText);
                $scope.$emit('changeLocation', redirect);
            }

            angular.extend(this, {
                inProgress: false,
                searchShown: false,
                searchResults: searchResults,
                redirectToResults: redirectToResults,
                search: search
            });
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$scope', 'ApiRequest', '$q',
        function ($scope, ApiRequest, $q) {
            $scope.searchResults = {
                artists: [],
                albums: [],
                tracks: []
            };

            $scope.search = function() {
                $scope.searchInProgress = true;
                $scope.searchShown = true;

                $q.all({
                    artists: ApiRequest.artist.search($scope.searchText).bound(0, 5).submit(),
                    albums: ApiRequest.album.search($scope.searchText).bound(0, 5).submit(),
                    tracks: ApiRequest.track.search($scope.searchText).bound(0, 5).submit()
                }).then(function(results) {
                    $scope.searchResults.artists = results.artists;
                    $scope.searchResults.albums = results.albums;
                    $scope.searchResults.tracks = results.tracks;
                    $scope.searchInProgress = false;
                }, function() {
                    $scope.searchShown = false;
                    $scope.searchInProgress = false;
                });
            };

            $scope.redirectToResults = function(type) {
                var redirect = '/' + type + '/s/' + encodeURIComponent($scope.searchText);
                $scope.$emit('changeLocation', redirect);
            };
        }]);

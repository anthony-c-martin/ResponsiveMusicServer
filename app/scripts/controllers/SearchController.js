'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$scope', 'HttpRequest',
        function ($scope, HttpRequest) {
            $scope.initSearch = function() {
                $scope.searchInProgress = true;
                $scope.search = {
                    artists: [],
                    albums: [],
                    tracks: []
                };

                $scope.toggleSearch(true);
                HttpRequest.search.all(5, $scope.searchText).then(function(results) {
                    $scope.search.artists = results.artists;
                    $scope.search.albums = results.albums;
                    $scope.search.tracks = results.tracks;
                    $scope.searchInProgress = false;
                });
            };

            $scope.redirectToResults = function(type) {
                var redirect = '/' + type + '/s/' + encodeURIComponent($scope.searchText);
                $scope.$emit('changeLocation', redirect);
            };
        }]);

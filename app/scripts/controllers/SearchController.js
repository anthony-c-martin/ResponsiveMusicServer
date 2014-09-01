'use strict';

angular.module('musicServerApp')
    .controller('SearchController', ['$scope', 'SearchRequest',
        function ($scope, SearchRequest) {
            $scope.search = function() {
                $scope.searchInProgress = true;
                $scope.toggleSearch(true);
                SearchRequest.all(5, $scope.searchText).then(function(results) {
                    $scope.artists = results.artists;
                    $scope.albums = results.albums;
                    $scope.tracks = results.tracks;
                    $scope.searchInProgress = false;
                });
            };

            $scope.redirectToResults = function(type) {
                var redirect = '/' + type + '/s/' + encodeURIComponent($scope.searchText);
                $scope.$emit('changeLocation', redirect);
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('AlbumViewController', ['$scope', '$routeParams', 'DataLoader', 'AlbumRequest',
        function ($scope, $routeParams, DataLoader, AlbumRequest) {
            $scope.albums = [];

            if ($routeParams.search) {
                $scope.albumRequest = DataLoader.init(AlbumRequest.search($routeParams.search), $scope.albums);
            }
            else {
                $scope.albumRequest = DataLoader.init(AlbumRequest.getAll(), $scope.albums);
            }
        }]);

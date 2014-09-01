'use strict';

angular.module('musicServerApp')
    .controller('ArtistViewController', ['$scope', '$routeParams', 'DataLoader', 'ArtistRequest', 'AlbumRequest',
        function ($scope, $routeParams, DataLoader, ArtistRequest, AlbumRequest) {
            $scope.artists = [];
            $scope.albums = [];

            if ($routeParams.search) {
                $scope.artistRequest = DataLoader.init(ArtistRequest.search($routeParams.search), $scope.artists);
            }
            else {
                $scope.artistRequest = DataLoader.init(ArtistRequest.getAll(), $scope.artists);
            }

            $scope.albumRequest = DataLoader.init(AlbumRequest.getAll(), $scope.albums);

            $scope.$on('loadAlbums', function (event, artistID) {
                event.stopPropagation();
                $scope.albums = [];

                $scope.albumRequest = DataLoader.init(AlbumRequest.getFromArtist(artistID), $scope.albums);
                $scope.albumRequest.fetch();
            });
        }]);

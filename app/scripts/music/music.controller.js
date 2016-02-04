(function() {
    'use strict';

    angular.module('app.music')
        .controller('MusicController', MusicController);

    /* @ngInject */
    function MusicController($scope, $rootScope, $state, $stateParams, DataLoaderFactory, ApiFactory) {
        var ctrl = this;
        var selectedArtistId = 0;
        var selectedAlbumId = 0;

        $scope.$on('$stateChangeSuccess', function stateChangeSuccess() {
            if (selectedArtistId !== $state.params.artistId) {
                selectedArtistId = $state.params.artistId;
                selectedAlbumId = 0;
                resetAlbums();
                resetTracks();
            }
            if (selectedAlbumId !== $state.params.albumId) {
                selectedAlbumId = $state.params.albumId;
                resetTracks();
            }
        });

        function resetArtists() {
            ctrl.artists.length = 0;
            $scope.artistRequest = null;

            if ($stateParams.search && $stateParams.type === 'artists') {
                $scope.artistRequest = new DataLoaderFactory(ApiFactory.artist.search($stateParams.search), ctrl.artists, 100);
                $scope.artistRequest.fetch();
            } else if (!$stateParams.search) {
                $scope.artistRequest = new DataLoaderFactory(ApiFactory.artist.getAll(), ctrl.artists, 100);
                $scope.artistRequest.fetch();
            }
        }

        function resetAlbums() {
            ctrl.albums.length = 0;
            $scope.albumRequest = null;

            if ($stateParams.search && $stateParams.type === 'albums') {
                $scope.albumRequest = new DataLoaderFactory(ApiFactory.album.search($stateParams.search), ctrl.albums, 100);
                $scope.albumRequest.fetch();
            } else if (selectedArtistId) {
                $scope.albumRequest = new DataLoaderFactory(ApiFactory.album.getFromArtist(selectedArtistId), ctrl.albums, 100);
                $scope.albumRequest.fetch();
            }
        }

        function resetTracks() {
            ctrl.tracks.length = 0;
            $scope.trackRequest = null;

            if ($stateParams.search && $stateParams.type === 'tracks') {
                $scope.trackRequest = new DataLoaderFactory(ApiFactory.track.search($stateParams.search), ctrl.tracks, 100);
                $scope.trackRequest.fetch();
            } else if (selectedAlbumId) {
                $scope.trackRequest = new DataLoaderFactory(ApiFactory.track.getFromAlbum(selectedAlbumId), ctrl.tracks, 100);
                $scope.trackRequest.fetch();
            }
        }

        $scope.tracks = [];
        angular.extend(this, {
            artists: [],
            albums: [],
            tracks: $scope.tracks
        });

        resetArtists();
        resetAlbums();
        resetTracks();
    }
})();

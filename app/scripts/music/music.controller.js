(function() {
    'use strict';

    angular.module('app.music')
        .controller('MusicController', MusicController);

    /* @ngInject */
    function MusicController($scope, $rootScope, $state, $stateParams, DataLoaderFactory, ApiFactory) {
        var ctrl = this;
        var selectedArtistId = 0;
        var selectedAlbumId = 0;

        function loadArtists() {
            ctrl.artists.length = 0;
            $scope.artistRequest = null;

            if ($stateParams.search && $stateParams.type === 'artists') {
                $scope.artistRequest = new DataLoaderFactory(ApiFactory.artist.search($stateParams.search), ctrl.artists, 100);
            } else if (!$stateParams.search) {
                $scope.artistRequest = new DataLoaderFactory(ApiFactory.artist.getAll(), ctrl.artists, 100);
            }
        }

        function loadAlbums(artist) {
            ctrl.albums.length = 0;
            $scope.albumRequest = null;

            if ($stateParams.search && $stateParams.type === 'albums') {
                $scope.albumRequest = new DataLoaderFactory(ApiFactory.album.search($stateParams.search), ctrl.albums, 100);
            } else if (artist) {
                $scope.albumRequest = new DataLoaderFactory(ApiFactory.album.getFromArtist(artist.ID), ctrl.albums, 100);
            }
        }

        function loadTracks(album) {
            ctrl.tracks.length = 0;
            $scope.trackRequest = null;

            if ($stateParams.search && $stateParams.type === 'tracks') {
                $scope.albumRequest = new DataLoaderFactory(ApiFactory.track.search($stateParams.search), ctrl.tracks, 100);
            } else if (album) {
                $scope.trackRequest = new DataLoaderFactory(ApiFactory.track.getFromAlbum(album.ID), ctrl.tracks, 100);
            }
        }

        $rootScope.$on('selectArtist', function(e, artist) {
            loadAlbums(artist);
            loadTracks(null);
            $scope.albumRequest.fetch();
            selectedArtistId = artist.ID;
            selectedAlbumId = 0;
            $state.go('music.artist', {artistId: selectedArtistId});
        });

        $rootScope.$on('selectAlbum', function(e, album) {
            loadTracks(album);
            $scope.trackRequest.fetch();
            selectedAlbumId = album.ID;
            $state.go('music.artist.album', {artistId: selectedArtistId, albumId: selectedAlbumId});
        });

        $scope.tracks = [];
        angular.extend(this, {
            artists: [],
            albums: [],
            tracks: $scope.tracks
        });

        loadArtists();
        loadAlbums();
        loadTracks();
    }
})();

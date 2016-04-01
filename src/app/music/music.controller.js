(function() {
  'use strict';

  angular.module('app.music')
    .controller('MusicController', MusicController);

  /* @ngInject */
  function MusicController($scope, $state, ApiFactory) {
    var ctrl = this;
    var shouldLoadMoreArtists = true;
    var shouldLoadMoreAlbums = true;
    var shouldLoadMoreTracks = true;

    var selectedAlbumId = 0;
    var selectedArtistId = 0;
    var firstLoad = true;
    $scope.$on('$stateChangeSuccess', function onStateChangeSuccess() {
      var shouldResetArtists = false;
      var shouldResetAlbums = false;
      var shouldResetTracks = false;

      if (firstLoad) {
        firstLoad = false;
        shouldResetArtists = true;
        shouldResetAlbums = true;
        shouldResetTracks = true;
      }
      if (selectedArtistId !== $state.params.artistId) {
        selectedArtistId = $state.params.artistId;
        shouldResetAlbums = true;
      }
      if (selectedAlbumId !== $state.params.albumId) {
        selectedAlbumId = $state.params.albumId;
        shouldResetTracks = true;
      }

      if (shouldResetArtists) {
        ctrl.artists.length = 0;
        shouldLoadMoreArtists = true;
        loadMoreArtists();
      }
      if (shouldResetAlbums) {
        ctrl.albums.length = 0;
        shouldLoadMoreAlbums = true;
        loadMoreAlbums();
      }
      if (shouldResetTracks) {
        ctrl.tracks.length = 0;
        shouldLoadMoreTracks = true;
        loadMoreTracks();
      }
    });

    function loadMoreArtists() {
      if (!shouldLoadMoreArtists) {
        return;
      }
      shouldLoadMoreArtists = false;
      ApiFactory.artist.getAll(ctrl.artists.length, 100).then(function(artists) {
        if (artists.length > 0) {
          shouldLoadMoreArtists = true;
        }
        while (artists.length > 0) {
          ctrl.artists.push(artists.shift());
        }
      });
    }

    function loadMoreAlbums() {
      if (!shouldLoadMoreAlbums || !selectedArtistId) {
        return;
      }
      shouldLoadMoreAlbums = false;
      ApiFactory.album.getFromArtist(selectedArtistId, ctrl.albums.length, 100).then(function(albums) {
        if (albums.length > 0) {
          shouldLoadMoreAlbums = true;
        }
        while (albums.length > 0) {
          ctrl.albums.push(albums.shift());
        }
      });
    }

    function loadMoreTracks() {
      if (!shouldLoadMoreTracks || !selectedAlbumId) {
        return;
      }
      shouldLoadMoreTracks = false;
      ApiFactory.track.getFromAlbum(selectedAlbumId, ctrl.tracks.length, 100).then(function(tracks) {
        if (tracks.length > 0) {
          shouldLoadMoreTracks = true;
        }
        while (tracks.length > 0) {
          ctrl.tracks.push(tracks.shift());
        }
      });
    }

    $scope.tracks = [];
    angular.extend(this, {
      artists: [],
      albums: [],
      tracks: $scope.tracks,
      loadMoreArtists: loadMoreArtists,
      loadMoreAlbums: loadMoreAlbums,
      loadMoreTracks: loadMoreTracks
    });
  }
})();

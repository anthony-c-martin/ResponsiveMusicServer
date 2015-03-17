'use strict';

angular.module('musicServerApp')
    .controller('MainController', ['$scope', '$rootScope', 'DataLoader', 'ApiRequest',
        function($scope, $rootScope, DataLoader, ApiRequest) {
            var ctrl = this;

            function loadArtists() {
                ctrl.artists.length = 0;
                $scope.artistRequest = new DataLoader(ApiRequest.artist.getAll(), ctrl.artists, 100);
            }

            function loadAlbums(artist) {
                ctrl.albums.length = 0;
                if (artist) {
                    $scope.albumRequest = new DataLoader(ApiRequest.album.getFromArtist(artist.ID), ctrl.albums, 100);
                } else {
                    $scope.albumRequest = null;
                }
            }

            function loadTracks(album) {
                ctrl.tracks.length = 0;
                if (album) {
                    $scope.trackRequest = new DataLoader(ApiRequest.track.getFromAlbum(album.ID), ctrl.tracks, 100);
                } else {
                    $scope.trackRequest = null;
                }
            }

            $rootScope.$on('selectArtist', function(e, artist) {
                loadAlbums(artist);
                loadTracks(null);
                $scope.albumRequest.fetch();
            });

            $rootScope.$on('selectAlbum', function(e, album) {
                loadTracks(album);
                $scope.trackRequest.fetch();
            });

            angular.extend(this, {
                artists: [],
                albums: [],
                tracks: []
            });

            $scope.tracks = this.tracks;
            loadArtists();
        }
    ]);

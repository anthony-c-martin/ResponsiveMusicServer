'use strict';

angular.module('musicServerApp')
    .controller('MainController', ['$scope', '$rootScope', 'DataLoader', 'PlayerService', 'ApiRequest',
        function($scope, $rootScope, DataLoader, PlayerService, ApiRequest) {
            var ctrl = this;

            var playlist = PlayerService.playlist;

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

            $rootScope.$on('addArtist', function(e, artist) {
                e.stopPropagation();
                playlist.addTracksByArtist(artist.ID);
            });

            $rootScope.$on('playArtist', function(e, artist) {
                e.stopPropagation();
                playlist.clear();
                playlist.addTracksByArtist(artist.ID).then(function() {
                    $scope.$emit('StartPlaying');
                });
            });

            $rootScope.$on('addAlbum', function(e, album) {
                e.stopPropagation();
                playlist.addTracksByAlbum(album.ID);
            });

            $rootScope.$on('playAlbum', function(e, album) {
                e.stopPropagation();
                playlist.clear();
                playlist.addTracksByAlbum(album.ID).then(function() {
                    $scope.$emit('StartPlaying');
                });
            });

            $rootScope.$on('addTrack', function(e, track) {
                e.stopPropagation();
                playlist.addTracks([track]);
            });

            $rootScope.$on('removeTrack', function(e, track) {
                e.stopPropagation();
                playlist.removeTrack(track);
            });

            $rootScope.$on('playTrack', function(e, track) {
                e.stopPropagation();
                playlist.clear();
                playlist.addTracks([track]);
                $scope.$emit('StartPlaying');
            });

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

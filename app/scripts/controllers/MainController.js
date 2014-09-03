'use strict';

angular.module('musicServerApp')
    .controller('MainController', ['$scope', '$rootScope', 'DataLoader', 'Playlist', 'HttpRequest',
        function($scope, $rootScope, DataLoader, Playlist, HttpRequest) {
            function loadArtists() {
                $scope.artists = [];
                $scope.artistRequest = DataLoader.init(HttpRequest.artist.getAll(), $scope.artists);
            }

            function loadAlbums(artist) {
                $scope.albums = [];
                if (artist) {
                    $scope.albumRequest = DataLoader.init(HttpRequest.album.getFromArtist(artist.ID), $scope.albums);
                } else {
                    $scope.albumRequest = {
                        fetch: $.noop
                    };
                }
            }

            function loadTracks(album) {
                $scope.tracks = [];
                if (album) {
                    $scope.trackRequest = DataLoader.init(HttpRequest.track.getFromAlbum(album.ID), $scope.tracks);
                } else {
                    $scope.trackRequest = {
                        fetch: $.noop
                    };
                }
            }

            function addTracksByArtist(artistId) {
                Playlist.addTracksByArtist(artistId);
            }

            function playTracksByArtist(artistId) {
                Playlist.clear();
                Playlist.addTracksByArtist(artistId).then(function() {
                    $scope.$emit('StartPlaying');
                });
            }

            function addTracksByAlbum(albumId) {
                Playlist.addTracksByAlbum(albumId);
            }

            function playTracksByAlbum(albumId) {
                Playlist.clear();
                Playlist.addTracksByAlbum(albumId).then(function() {
                    $scope.$emit('StartPlaying');
                });
            }

            function playTrack(track) {
                Playlist.clear();
                Playlist.addTracks([track]);
                $scope.$emit('StartPlaying');
            }

            function addTrack(track) {
                Playlist.addTracks([track]);
            }

            $rootScope.$on('addArtist', function(e, artist) {
                e.stopPropagation();
                addTracksByArtist(artist.ID);
            });

            $rootScope.$on('playArtist', function(e, artist) {
                e.stopPropagation();
                playTracksByArtist(artist.ID);
            });

            $rootScope.$on('addAlbum', function(e, album) {
                e.stopPropagation();
                addTracksByAlbum(album.ID);
            });

            $rootScope.$on('playAlbum', function(e, album) {
                e.stopPropagation();
                playTracksByAlbum(album.ID);
            });

            $rootScope.$on('addTrack', function(e, track) {
                e.stopPropagation();
                addTrack(track);
            });

            $rootScope.$on('playTrack', function(e, track) {
                e.stopPropagation();
                playTrack(track);
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

            loadArtists();
        }
    ]);

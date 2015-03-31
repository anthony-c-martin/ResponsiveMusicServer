'use strict';

angular.module('musicServerApp')
    .controller('MainController', ['$scope', '$rootScope', '$routeParams', 'dataLoaderService', 'apiService',
        function($scope, $rootScope, $routeParams, dataLoaderService, apiService) {
            var ctrl = this;

            function loadArtists() {
                ctrl.artists.length = 0;
                $scope.artistRequest = null;

                if ($routeParams.search && $routeParams.type === 'artists') {
                    $scope.artistRequest = new dataLoaderService(apiService.artist.search($routeParams.search), ctrl.artists, 100);
                } else if (!$routeParams.search) {
                    $scope.artistRequest = new dataLoaderService(apiService.artist.getAll(), ctrl.artists, 100);
                }
            }

            function loadAlbums(artist) {
                ctrl.albums.length = 0;
                $scope.albumRequest = null;

                if ($routeParams.search && $routeParams.type === 'albums') {
                    $scope.albumRequest = new dataLoaderService(apiService.album.search($routeParams.search), ctrl.albums, 100);
                } else if (artist) {
                    $scope.albumRequest = new dataLoaderService(apiService.album.getFromArtist(artist.ID), ctrl.albums, 100);
                }
            }

            function loadTracks(album) {
                ctrl.tracks.length = 0;
                $scope.trackRequest = null;

                if ($routeParams.search && $routeParams.type === 'tracks') {
                    $scope.albumRequest = new dataLoaderService(apiService.track.search($routeParams.search), ctrl.tracks, 100);
                } else if (album) {
                    $scope.trackRequest = new dataLoaderService(apiService.track.getFromAlbum(album.ID), ctrl.tracks, 100);
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
            loadAlbums();
            loadTracks();
        }
    ]);

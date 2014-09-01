'use strict';

angular.module('musicServerApp')
    .controller('ArtistListController', ['$scope', 'Playlist',
        function ($scope, Playlist) {
            $scope.$on('addArtist', function(e, artist) {
                e.stopPropagation();
                addTracksByArtist(artist.ID);
            });
            $scope.$on('playArtist', function(e, artist) {
                e.stopPropagation();
                playTracksByArtist(artist.ID);
            });

            $scope.showAlbums = function (artistID) {
                $scope.$emit('loadAlbums', artistID);
            };

            function addTracksByArtist(artistId) {
                Playlist.addTracksByArtist(artistId);
            }

            function playTracksByArtist(artistId) {
                Playlist.clear();
                Playlist.addTracksByArtist(artistId).then(function() {
                    $scope.$emit('StartPlaying');
                });
            }
        }]);

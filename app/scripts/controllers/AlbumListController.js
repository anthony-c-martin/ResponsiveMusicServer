'use strict';

angular.module('musicServerApp')
    .controller('AlbumListController', ['$scope', 'Playlist',
        function($scope, Playlist) {
            $scope.$on('addAlbum', function(e, album) {
                e.stopPropagation();
                addTracksByAlbum(album.ID);
            });
            $scope.$on('playAlbum', function(e, album) {
                e.stopPropagation();
                playTracksByAlbum(album.ID);
            });

            function addTracksByAlbum(albumId) {
                Playlist.addTracksByAlbum(albumId);
            }

            function playTracksByAlbum(albumId) {
                Playlist.clear();
                Playlist.addTracksByAlbum(albumId).then(function() {
                    $scope.$emit('StartPlaying');
                });
            }
        }
    ]);
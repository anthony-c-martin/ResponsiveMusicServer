'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'Playlist', 'SelectableTracks',
        function ($scope, Playlist, SelectableTracks) {
            $scope.playlistArea = new SelectableTracks();
            $scope.playlistArea.allTracks = Playlist.trackArray;

            $scope.playlist = Playlist.trackArray;

            $scope.removeTrack = function(track) {
                Playlist.removeTrack(track);
            };

            $scope.removeAll = function() {
                Playlist.clear();
            };

            $scope.removeSelection = function() {
                $scope.playlistArea.removeSelection();
            };
        }]);

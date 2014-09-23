'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'Playlist', 'SelectableTracks',
        function ($scope, Playlist, SelectableTracks) {
            $scope.playlistArea = new SelectableTracks();
            $scope.playlistArea.allTracks = Playlist.trackArray;

            $scope.playlist = Playlist.trackArray;

            this.removeTrack = function(track) {
                Playlist.removeTrack(track);
            };

            this.removeAll = function() {
                Playlist.clear();
            };

            this.removeSelection = function() {
                $scope.playlistArea.removeSelection();
            };
        }]);

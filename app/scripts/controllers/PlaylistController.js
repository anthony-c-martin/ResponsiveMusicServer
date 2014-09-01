'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'Playlist',
        function ($scope, Playlist) {
            $scope.playlist = Playlist.trackArray;

            $scope.removeTrack = function(track) {
                Playlist.removeTrack(track);
            };

            $scope.clearAll = function() {
                Playlist.clear();
            };
        }]);

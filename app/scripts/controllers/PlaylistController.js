'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'Playlist', 'SelectableTracks',
        function ($scope, Playlist, SelectableTracks) {
            $scope.trackArea = new SelectableTracks();
            $scope.trackArea.allTracks = Playlist.trackArray;

            var playlist = Playlist.trackArray;

            function removeTrack(track) {
                Playlist.removeTrack(track);
            }

            function removeAll() {
                Playlist.clear();
            }

            function removeSelection() {
                $scope.trackArea.removeSelection();
            }

            angular.extend(this, {
                playlist: playlist,
                removeTrack: removeTrack,
                removeAll: removeAll,
                removeSelection: removeSelection
            });
        }]);

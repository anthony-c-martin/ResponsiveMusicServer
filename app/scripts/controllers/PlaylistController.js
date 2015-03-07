'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'PlayerService', 'SelectableTracks',
        function ($scope, PlayerService, SelectableTracks) {
            var playlist = PlayerService.playlist;

            $scope.trackArea = new SelectableTracks();
            $scope.trackArea.allTracks = playlist.tracks;

            function removeTrack(track) {
                playlist.removeTrack(track);
            }

            function removeAll() {
                playlist.clear();
            }

            function removeSelection() {
                $scope.trackArea.removeSelection();
            }

            angular.extend(this, {
                playlist: playlist.tracks,
                removeTrack: removeTrack,
                removeAll: removeAll,
                removeSelection: removeSelection
            });
        }]);

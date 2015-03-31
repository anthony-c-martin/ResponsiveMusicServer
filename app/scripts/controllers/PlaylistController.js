'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'playerService', 'selectableTracksService',
        function ($scope, playerService, selectableTracksService) {
            var playlist = playerService.playlist;

            $scope.trackArea = new selectableTracksService();
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

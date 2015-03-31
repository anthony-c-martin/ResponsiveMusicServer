'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'playerService', 'selectableTracksFactory',
        function ($scope, playerService, selectableTracksFactory) {
            var playlist = playerService.playlist;

            $scope.trackArea = new selectableTracksFactory();
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

(function() {
    'use strict';

    angular.module('app.components.playlist')
        .controller('PlaylistController', PlaylistController);

    /* @ngInject */
    function PlaylistController($scope, playerService, selectableTracksFactory) {
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
            playlistShown: false,
            playlist: playlist.tracks,
            removeTrack: removeTrack,
            removeAll: removeAll,
            removeSelection: removeSelection
        });
    }
})();

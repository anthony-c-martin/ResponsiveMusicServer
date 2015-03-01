'use strict';

angular.module('musicServerApp')
    .controller('PlaylistController', ['$scope', 'Playlist', 'SelectableTracks',
        function ($scope, Playlist, SelectableTracks) {
            var area = new SelectableTracks();
            area.allTracks = Playlist.trackArray;

            var playlist = Playlist.trackArray;

            function removeTrack(track) {
                Playlist.removeTrack(track);
            }

            function removeAll() {
                Playlist.clear();
            }

            function removeSelection() {
                area.removeSelection();
            }

            angular.extend(this, {
                area: area,
                playlist: playlist,
                removeTrack: removeTrack,
                removeAll: removeAll,
                removeSelection: removeSelection
            });
        }]);

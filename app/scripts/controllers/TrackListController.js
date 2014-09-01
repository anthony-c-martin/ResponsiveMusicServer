'use strict';

angular.module('musicServerApp')
    .controller('TrackListController', ['$scope', 'Playlist',
        function($scope, Playlist) {
            $scope.$on('addTrack', function(e, track) {
                e.stopPropagation();
                addTrack(track);
            });
            $scope.$on('playTrack', function(e, track) {
                e.stopPropagation();
                playTrack(track);
            });

            function playTrack(track) {
                Playlist.clear();
                Playlist.addTracks([track]);
                $scope.$emit('StartPlaying');
            }

            function addTrack(track) {
                Playlist.addTracks([track]);
            }
        }
    ]);
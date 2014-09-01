'use strict';

angular.module('musicServerApp')
    .controller('AlbumTrackListController', ['$scope', 'DataLoader', 'TrackRequest', 'Playlist',
        function ($scope, DataLoader, TrackRequest, Playlist) {
            $scope.album = $scope.inputAlbum;

            $scope.tracks = [];
            $scope.request = DataLoader.init(TrackRequest.getFromAlbum($scope.album.ID), $scope.tracks);

            $scope.close = function () {
                $scope.$destroy();
            };

            $scope.playAll = function () {
                Playlist.clear();
                $scope.addAll();
                $scope.$emit('StartPlaying');
            };

            $scope.addAll = function () {
                Playlist.addTracks($scope.tracks);
            };

            $scope.getDiscs = function() {
                var groupArray = [];
                angular.forEach($scope.tracks, function (track) {
                    if (groupArray.indexOf(track.DiscNumber) === -1) {
                        groupArray.push(track.DiscNumber);
                    }
                });
                return groupArray.sort();
            };

            $scope.request.fetch().then(function() {
                //Allow angular to pick up the data and prepare the view before displaying it
                setTimeout(function() {
                    $scope.showTrackList();
                }, 1);
            });
        }]);

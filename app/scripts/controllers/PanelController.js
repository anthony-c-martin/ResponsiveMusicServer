'use strict';

angular.module('musicServerApp')
    .controller('PanelController', ['$scope', '$rootScope', 'SelectableTracks',
        function($scope, $rootScope, SelectableTracks) {
            $scope.trackArea = new SelectableTracks();
            $scope.trackArea.allTracks = $scope.tracks;

            $rootScope.$on('selectArtist', function(e, artist) {
                $scope.selectedArtist = artist;
                $scope.selectedAlbum = null;
            });

            $rootScope.$on('selectAlbum', function(e, album) {
                $scope.selectedAlbum = album;
            });

            $scope.deselectArtist = function() {
                $scope.selectedAlbum = null;
                $scope.selectedArtist = null;
            };

            $scope.deselectAlbum = function() {
                $scope.selectedAlbum = null;
            };

            $scope.deselectTracks = function(e) {
                e.stopPropagation();
                $scope.trackArea.clearSelection();
            };

            $scope.isArtistsShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return !$scope.selectedAlbum;
                }

                return !$scope.selectedArtist;
            };

            $scope.isAlbumsShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return true;
                }

                return !$scope.selectedAlbum;
            };

            $scope.isTracksShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if ($scope.selectedAlbum) {
                    return true;
                }

                return false;
            };
        }]);

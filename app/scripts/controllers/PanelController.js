'use strict';

angular.module('musicServerApp')
    .controller('PanelController', ['$scope', '$rootScope', 'SelectableTracks',
        function($scope, $rootScope, SelectableTracks) {
            var ctrl = this;
            this.trackArea = new SelectableTracks();
            this.trackArea.allTracks = $scope.tracks;

            $rootScope.$on('selectArtist', function($event, artist) {
                ctrl.selectedArtist = artist;
                ctrl.selectedAlbum = null;
            });

            $rootScope.$on('selectAlbum', function($event, album) {
                ctrl.selectedAlbum = album;
            });

            this.deselectArtist = function() {
                ctrl.selectedAlbum = null;
                ctrl.selectedArtist = null;
            };

            this.deselectAlbum = function() {
                ctrl.selectedAlbum = null;
            };

            this.deselectTracks = function($event) {
                $event.stopPropagation();
                ctrl.trackArea.clearSelection();
            };

            this.isArtistsShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return !(ctrl.selectedAlbum && ctrl.selectedArtist);
                }

                return !ctrl.selectedArtist;
            };

            this.isAlbumsShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return true;
                }
                return !!ctrl.selectedArtist && !ctrl.selectedAlbum;
            };

            this.isTracksShown = function() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (ctrl.selectedArtist && ctrl.selectedAlbum) {
                    return true;
                }

                return false;
            };
        }]);

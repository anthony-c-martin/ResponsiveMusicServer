'use strict';

angular.module('musicServerApp')
    .controller('PanelController', ['$scope', '$rootScope', 'SelectableTracks',
        function($scope, $rootScope, SelectableTracks) {
            var ctrl = this;

            var trackArea = new SelectableTracks();
            trackArea.allTracks = $scope.tracks;

            $rootScope.$on('selectArtist', function($event, artist) {
                ctrl.selectedArtist = artist;
                ctrl.selectedAlbum = null;
            });

            $rootScope.$on('selectAlbum', function($event, album) {
                ctrl.selectedAlbum = album;
            });

            function deselectArtist() {
                ctrl.selectedAlbum = null;
                ctrl.selectedArtist = null;
            }

            function deselectAlbum() {
                ctrl.selectedAlbum = null;
            }

            function deselectTracks($event) {
                $event.stopPropagation();
                ctrl.trackArea.clearSelection();
            }

            function isArtistsShown() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return !(ctrl.selectedAlbum && ctrl.selectedArtist);
                }

                return !ctrl.selectedArtist;
            }

            function isAlbumsShown() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (!$scope.isPhone) {
                    return true;
                }
                return !!ctrl.selectedArtist && !ctrl.selectedAlbum;
            }

            function isTracksShown() {
                if ($scope.isDesktop) {
                    return true;
                }
                if (ctrl.selectedArtist && ctrl.selectedAlbum) {
                    return true;
                }

                return false;
            }

            angular.extend(this, {
                selectedArtist: null,
                selectedAlbum: null,
                trackArea: trackArea,
                deselectArtist: deselectArtist,
                deselectAlbum: deselectAlbum,
                deselectTracks: deselectTracks,
                isArtistsShown: isArtistsShown,
                isAlbumsShown: isAlbumsShown,
                isTracksShown: isTracksShown
            });
        }]);

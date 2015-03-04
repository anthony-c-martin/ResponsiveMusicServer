'use strict';

angular.module('musicServerApp')
    .directive('track', ['DraggableData',
        function(DraggableData) {
            function linkFunction(scope, element, attrs) {
                var isPlaylistTrack = (attrs.playlistTrack !== undefined);

                scope.addable = true;
                scope.closable = false;
                scope.dragoverPre = false;
                scope.dragoverPost = false;

                if (isPlaylistTrack) {
                    scope.closable = true;
                    scope.addable = false;

                    DraggableData.bindTrackDropEvents(element, scope);
                }

                DraggableData.bindDragEvents(element, scope.track, 'Track', function() {
                    if (scope.trackArea) {
                        var deleteOriginalTracks = isPlaylistTrack;
                        return scope.trackArea.listTracks(deleteOriginalTracks);
                    }
                    return [scope.track];
                }, function() {
                    if (scope.trackArea) {
                        return scope.track.selected;
                    }
                    return true;
                });
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                controller: 'TrackController',
                controllerAs: 'trackCtrl',
                bindToController: true,
                link: linkFunction
            };
        }]);

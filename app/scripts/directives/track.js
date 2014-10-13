'use strict';

angular.module('musicServerApp')
    .directive('track', ['DraggableData',
        function(DraggableData) {
            function linkFunction(scope, element, attrs) {
                var ctrl = scope.trackCtrl;
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

                DraggableData.bindDragEvents(element, ctrl.track, 'Track', function() {
                    if (ctrl.trackArea) {
                        var deleteOriginalTracks = isPlaylistTrack;
                        return ctrl.trackArea.listTracks(deleteOriginalTracks);
                    }
                    return [ctrl.track];
                }, function() {
                    if (ctrl.trackArea) {
                        return ctrl.track.selected;
                    }
                    return true;
                });
            }

            return {
                scope: {
                    'track': '=',
                    'trackArea': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/track.partial.html',
                controller: 'TrackController',
                controllerAs: 'trackCtrl',
                bindToController: true,
                link: linkFunction
            };
        }]);

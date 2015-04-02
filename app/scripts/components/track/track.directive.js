(function() {
    'use strict';

    angular.module('app.components.track')
        .directive('amTrack', track);

    /* @ngInject */
    function track(draggableDataService) {
        return {
            scope: {
                'track': '=amTrack',
                'trackArea': '='
            },
            restrict: 'A',
            replace: true,
            templateUrl: 'scripts/components/track/track.html',
            controller: 'TrackController',
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunction
        };

        function linkFunction(scope, element, attrs, ctrl) {
            var isPlaylistTrack = (attrs.playlistTrack !== undefined);

            scope.addable = true;
            scope.closable = false;
            scope.dragoverPre = false;
            scope.dragoverPost = false;

            if (isPlaylistTrack) {
                scope.closable = true;
                scope.addable = false;

                draggableDataService.bindTrackDropEvents(element, scope);
            }

            draggableDataService.bindDragEvents(element, ctrl.track, 'Track', function() {
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
    }
})();

(function() {
    'use strict';

    angular.module('app.components.album')
        .directive('amAlbum', album);

    /* @ngInject */
    function album(draggableDataService) {
        return {
            scope: {
                'album': '=amAlbum'
            },
            restrict: 'A',
            replace: true,
            templateUrl: 'scripts/components/album/album.html',
            controller: 'AlbumController',
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunction
        };

        function linkFunction(scope, element, attrs, ctrl) {
            draggableDataService.bindDragEvents(element, ctrl.album, 'Album', function() {
                return [ctrl.album];
            }, function() {
                return true;
            });
        }
    }
})();

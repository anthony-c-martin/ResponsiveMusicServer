'use strict';

angular.module('musicServerApp')
    .directive('artist', ['draggableDataService',
        function(draggableDataService) {
            return {
                scope: {
                    'artist': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'app/artist.partial.html',
                controller: 'ArtistController',
                controllerAs: 'artistCtrl',
                bindToController: true,
                link: function(scope, element) {
                    var ctrl = scope.artistCtrl;

                    draggableDataService.bindDragEvents(element, ctrl.artist, 'Artist', function() {
                        return [ctrl.artist];
                    }, function() {
                        return true;
                    });
                }
            };
        }]);

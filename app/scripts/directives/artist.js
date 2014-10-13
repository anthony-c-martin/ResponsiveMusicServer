'use strict';

angular.module('musicServerApp')
    .directive('artist', ['DraggableData',
        function(DraggableData) {
            return {
                scope: {
                    'artist': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/artist.partial.html',
                controller: 'ArtistController',
                controllerAs: 'artistCtrl',
                bindToController: true,
                link: function(scope, element) {
                    var ctrl = scope.artistCtrl;

                    DraggableData.bindDragEvents(element, ctrl.artist, 'Artist', function() {
                        return [ctrl.artist];
                    }, function() {
                        return true;
                    });
                }
            };
        }]);

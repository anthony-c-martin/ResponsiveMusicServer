'use strict';

angular.module('musicServerApp')
        .directive('playlistButton', ['draggableDataService',
        function(draggableDataService) {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    draggableDataService.bindPlaylistDropEvents(element);
                }
            };
        }]);

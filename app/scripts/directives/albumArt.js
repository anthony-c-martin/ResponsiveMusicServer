'use strict';

angular.module('musicServerApp')
    .directive('albumArt', [
        function () {
            return {
                scope: {
                    album: '=albumArt'
                },
                restrict: 'A',
                link: function (scope, element) {
                    if (scope.album.Artwork) {
                        element.attr('src', 'data:image/png;base64,' + scope.album.Artwork);
                    }
                }
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('albumTracks', [

        function() {
            function linkFunction(scope, element) {
                var destroyed = false;
                scope.$on('$destroy', function() {
                    destroyed = true;
                    element.slideUp(400, function() {
                        element.remove();
                    });
                });

                scope.showTrackList = function() {
                    if (!destroyed) {
                        /*TODO see logic below. Hide, insert after last album on row, then call slideDown*/

                        //var arrowCenter = scope.album.el.position().left + (scope.album.el.outerWidth() / 2);
                        //element.hide().insertAfter(getRowEnd(scope.album.el));
                        //element.find('.arrow-new').css('left', arrowCenter + 'px');
                        element.slideDown(400);
                    }
                };
            }

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album-tracks.partial.html',
                link: linkFunction,
                scope: {
                    'tracks': '=albumTracks'
                }
            };
        }
    ]);

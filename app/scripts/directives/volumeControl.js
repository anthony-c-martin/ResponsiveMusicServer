'use strict';

angular.module('musicServerApp')
    .directive('volumeControl', [
        function() {
            function link(scope) {
                scope.volumeChange = function($event) {
                    var height = $event.currentTarget.clientHeight;
                    var bottom = height - $event.offsetY;
                    scope.volumeUpdate(bottom / height);
                };
            }

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/volumeControl.partial.html',
                scope: {
                    volumeUpdate: '=',
                    currentAudio: '='
                },
                link: link
            };
        }]);

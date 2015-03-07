'use strict';

angular.module('musicServerApp')
    .directive('volumeControl', [
        function() {
            function link(scope) {
                scope.volumeChange = function($event) {
                    var height = angular.element($event.currentTarget).height();
                    var bottom = height - $event.offsetY;
                    scope.volumeUpdate(bottom / height);
                };
            }

            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'views/volumeControl.partial.html',
                scope: {
                    volumeUpdate: '='
                },
                link: link
            };
        }]);

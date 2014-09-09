'use strict';

angular.module('musicServerApp')
    .directive('volumeControl', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope) {
                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'volume')) {
                            scope.volumeShown = false;
                        }
                    });

                    scope.volumeChange = function($event) {
                        var height = $($event.currentTarget).height();
                        var bottom = height - $event.offsetY;
                        scope.setVolume = bottom / height;
                    };
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'volumeControl.partial.html'
            };
        }]);

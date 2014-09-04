'use strict';

angular.module('musicServerApp')
    .directive('volumeControl', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'volume')) {
                            scope.volumeShown = false;
                            element.hide();
                        }
                    });

                    scope.toggleVolumeHandler = function() {
                        scope.volumeShown = !scope.volumeShown;
                        element.toggle(scope.volumeShown);
                    };

                    scope.volumeChange = function($event) {
                        var height = $($event.currentTarget).height();
                        var bottom = height - $event.offsetY;
                        scope.setVolume = bottom / height;
                    };
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'volume-control.partial.html'
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('volumeControl', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'volume')) {
                            element.hide();
                        }
                    });

                    scope.toggleVolumeHandler = function(toggle) {
                        element.toggle(toggle);
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

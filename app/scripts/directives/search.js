'use strict';

angular.module('musicServerApp')
    .directive('search', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'search')) {
                            scope.searchShown = false;
                            element.hide();
                        }
                    });

                    scope.toggleSearch = function(toggle) {
                        scope.searchShown = toggle
                        element.toggle(scope.searchShown);
                    };
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'search.partial.html'
            };
        }]);

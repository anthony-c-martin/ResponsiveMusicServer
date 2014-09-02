'use strict';

angular.module('musicServerApp')
    .directive('search', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                    element.hide();

                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'search')) {
                            element.hide();
                        }
                    });

                    scope.toggleSearch = function(toggle) {
                        element.toggle(toggle);
                    };
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'search.partial.html'
            };
        }]);

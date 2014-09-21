'use strict';

angular.module('musicServerApp')
    .directive('search', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope) {
                    $rootScope.$on('hideDropdowns', function(e, data) {
                        if (!(data && data === 'search')) {
                            scope.searchShown = false;
                        }
                    });
                },
                restrict: 'E',
                replace: true,
                templateUrl: 'views/search.partial.html'
            };
        }]);

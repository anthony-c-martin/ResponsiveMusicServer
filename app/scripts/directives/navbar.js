'use strict';

angular.module('musicServerApp')
    .directive('navbar', [
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'app/navbar.partial.html'
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('errorModal', [
        function() {
            return {
                scope: {
                    errorMessage: '='
                },
                restrict: 'E',
                templateUrl: 'views/errorModal.partial.html'
            };
        }]);

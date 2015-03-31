'use strict';

angular.module('musicServerApp')
    .directive('errorModal', [
        function() {
            return {
                scope: {
                    errorMessage: '='
                },
                restrict: 'E',
                templateUrl: 'app/errorModal.partial.html'
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('errorModal', [
        function() {
            return {
                restrict: 'E',
                templateUrl: 'views/errorModal.partial.html'
            };
        }]);

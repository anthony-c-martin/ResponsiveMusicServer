'use strict';

angular.module('musicServerApp')
    .controller('ErrorModalController', ['$scope', '$rootScope',
        function($scope, $rootScope) {
            $scope.errorText = '';

            $rootScope.$on('Error.Display', function(e, errorText) {
                $scope.errorText = errorText;
                $scope.toggleErrorModal(true);
            });
            $rootScope.$on('Error.Clear', function() {
                $scope.toggleErrorModal(false);
            });
        }]);

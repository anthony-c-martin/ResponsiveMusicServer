'use strict';

angular.module('musicServerApp')
    .controller('LoginController', ['$scope', '$rootScope', 'LoginRequest',
        function ($scope, $rootScope, LoginRequest) {
            $scope.auth = {};

            $scope.login = function () {
                LoginRequest.login($scope.auth.username, $scope.auth.password).then(function(data) {
                    $scope.$emit('loginSuccess', {
                        Key: data.Session,
                        Secret: data.Secret
                    });
                }, function (message) {
                    console.warn(message);
                    $rootScope.$emit('Error.Display', 'Login attempt failed. Please try again.');
                });
            };
        }]);

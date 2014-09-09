'use strict';

angular.module('musicServerApp')
    .controller('LoginController', ['$scope', '$rootScope', 'HttpRequest',
        function ($scope, $rootScope, HttpRequest) {
            $scope.auth = {};

            $scope.login = function () {
                HttpRequest.session.login($scope.auth.username, $scope.auth.password).then(function(data) {
                    $scope.$emit('loginSuccess', {
                        Key: data.Session,
                        Secret: data.Secret
                    });
                }, function (message) {
                    console.warn(message);
                    $rootScope.$emit('errorDisplay', 'Login attempt failed. Please try again.');
                });
            };
        }]);

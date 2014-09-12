'use strict';

angular.module('musicServerApp')
    .controller('LoginController', ['$scope', '$rootScope', 'ApiRequest',
        function ($scope, $rootScope, ApiRequest) {
            var thisController = this;
            $scope.auth = {};

            this.loginFailed = function(message) {
                console.warn(message);
                $rootScope.$emit('errorDisplay', 'Login attempt failed. Please try again.');
            };

            this.authString = function(username, password, token) {
                var pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                return md5(token + ':' + username + ':' + pswdHash + ':' + token);
            };

            $scope.login = function () {
                ApiRequest.session.getToken().submit().then(function(data) {
                    var authString = thisController.authString($scope.auth.username, $scope.auth.password, data.Token);
                    ApiRequest.session.getSession(data.Token, authString).submit().then(function(data) {
                        $scope.$emit('loginSuccess', {
                            Key: data.Session,
                            Secret: data.Secret
                        });
                    }, function() {
                        thisController.loginFailed();
                    });
                }, function() {
                    thisController.loginFailed();
                });
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('LoginController', ['$scope', '$rootScope', 'ApiRequest',
        function ($scope, $rootScope, ApiRequest) {
            var ctrl = this;

            function loginFailed(message) {
                console.warn(message);
                $rootScope.$emit('errorDisplay', 'Login attempt failed. Please try again.');
            }

            function authString(username, password, token) {
                var pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                return md5(token + ':' + username + ':' + pswdHash + ':' + token);
            }

            function login() {
                ApiRequest.session.getToken().submit().then(function(data) {
                    var authString = ctrl.authString(ctrl.auth.username, ctrl.auth.password, data.Token);
                    ApiRequest.session.getSession(data.Token, authString).submit().then(function(data) {
                        $scope.$emit('loginSuccess', {
                            Key: data.Session,
                            Secret: data.Secret
                        });
                    }, function() {
                        ctrl.loginFailed();
                    });
                }, function() {
                    ctrl.loginFailed();
                });
            }

            angular.extend(this, {
                auth: {},
                login: login,
                loginFailed: loginFailed,
                authString: authString
            });
        }]);

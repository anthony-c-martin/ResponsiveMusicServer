'use strict';

angular.module('musicServerApp')
    .controller('LoginController', ['$rootScope', '$routeParams', 'ApiFactory',
        function ($rootScope, $routeParams, ApiFactory) {
            var ctrl = this;

            function loginFailed(message) {
                console.warn(message);
                $rootScope.$emit('app.components.error.ErrorMessage', 'Login attempt failed. Please try again.');
            }

            function getAuthString(username, password, token) {
                var pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                return md5(token + ':' + username + ':' + pswdHash + ':' + token);
            }

            function submitSessionRequest(token, authString) {
                ApiFactory.session.getSession(token, authString).submit().then(function(data) {
                    $rootScope.$emit('loginSuccess', {
                        Key: data.Session,
                        Secret: data.Secret
                    });
                }, function() {
                    ctrl.loginFailed();
                });
            }

            function login() {
                ApiFactory.session.getToken().submit().then(function(data) {
                    var authString = getAuthString(ctrl.auth.username, ctrl.auth.password, data.Token);
                    submitSessionRequest(data.Token, authString);
                }, function() {
                    ctrl.loginFailed();
                });
            }

            if ($routeParams.token && $routeParams.auth) {
                submitSessionRequest($routeParams.token, $routeParams.auth);
            }

            angular.extend(this, {
                auth: {},
                login: login,
                loginFailed: loginFailed,
                getAuthString: getAuthString
            });
        }]);

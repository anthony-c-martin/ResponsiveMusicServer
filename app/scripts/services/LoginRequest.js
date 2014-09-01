'use strict';

angular.module('musicServerApp')
    .factory('LoginRequest', ['HttpRequest', '$q',
        function (HttpRequest, $q) {
            return {
                login: function (username, password) {
                    var deferred = $q.defer();

                    function getSession(token, username, password) {
                        var pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                        var authString = md5(token + ':' + username + ':' + pswdHash + ':' + token);
                        HttpRequest.unauthenticated('GetSession', {
                            Token: token,
                            Authentication: authString
                        }).load().then(function (data) {
                            deferred.resolve(data);
                        }, function (message) {
                            deferred.reject(message);
                        });
                    }

                    HttpRequest.unauthenticated('GetToken', {
                    }).load().then(function (data) {
                        getSession(data.Token, username, password);
                    }, function (message) {
                        deferred.reject(message);
                    });
                    return deferred.promise;
                },
                getUserPreferences: function() {
                    return HttpRequest.authenticated('GetUserPreferences', {});
                }
            };
        }]);

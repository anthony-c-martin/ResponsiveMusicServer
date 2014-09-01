'use strict';

angular.module('musicServerApp')
    .factory('HttpRequest', ['$http', '$q', '$rootScope', 'SessionData',
        function ($http, $q, $rootScope, SessionData) {
            function addSignature(object, useAuth) {
                var sigString = '';
                var keys = [];
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        if (key !== 'Signature' && (typeof object[key] === 'string' || typeof object[key] === 'number')) {
                            keys.push(key);
                        }
                    }
                }
                keys = keys.sort();
                for (var i = 0; i < keys.length; i++) {
                    sigString += keys[i] + ':' + object[keys[i]] + ';';
                }

                if (useAuth) {
                    sigString += SessionData.getSession().Secret + ';';
                }
                object.Signature = md5(sigString);
                return object;
            }

            function httpRequest(command, params, useAuth, onSuccess) {
                params.Command = SessionData.commands[command];
                if (useAuth) {
                    params.Session = SessionData.getSession().Key;
                }
                var deferred = $q.defer();
                var signedParams = addSignature(params, useAuth);
                $http.post(SessionData.jsonURL, signedParams).success(function (data) {
                    if (onSuccess) {
                        onSuccess(data);
                    }
                    deferred.resolve(data);
                }).error(function (data, status) {
                    deferred.reject('Error ' + status + ' on HTTP request. Command: "' + signedParams.Command + '"');
                    if (status === 401) {
                        $rootScope.$emit('ResponseUnauthorised');
                    }
                });
                return deferred.promise;
            }

            function fetchRequest(command, params) {
                return {
                    params: params,
                    load: function () {
                        return httpRequest(command, this.params, true);
                    }
                };
            }
            function fetchRequestWithBounds(command, params) {
                var baseRequest = fetchRequest(command, params);
                return {
                    params: baseRequest.params,
                    start: 0,
                    limit: 100,
                    load: function () {
                        var _this = this;
                        this.params.Start = this.start;
                        this.params.Limit = this.limit;
                        return httpRequest(command, this.params, true, function (data) {
                            _this.start += data.length;
                        });
                    }
                };
            }

            return {
                fetchAll: function (command, withBounds) {
                    var request = withBounds ? fetchRequestWithBounds : fetchRequest;
                    return request(command, {});
                },
                fetchByID: function (command, withBounds, ID) {
                    var request = withBounds ? fetchRequestWithBounds : fetchRequest;
                    return request(command, {ID: ID});
                },
                fetchByString: function (command, withBounds, string) {
                    var request = withBounds ? fetchRequestWithBounds : fetchRequest;
                    return request(command, {String: string});
                },
                authenticated: function (command, params) {
                    return {
                        load: function () {
                            return httpRequest(command, params, true, function () {
                            });
                        }
                    };
                },
                unauthenticated: function (command, params) {
                    return {
                        load: function () {
                            return httpRequest(command, params, false, function () {
                            });
                        }
                    };
                }
            };
        }]);

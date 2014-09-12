'use strict';

angular.module('musicServerApp')
    .factory('HttpRequest', ['$http', '$q', '$rootScope',
        function($http, $q, $rootScope) {
            function getSignature(object, sessionSecret) {
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

                if (sessionSecret) {
                    sigString += sessionSecret + ';';
                }
                return md5(sigString);
            }

            function submitRequest(url, params, secret) {
                var deferred = $q.defer();
                params.Signature = getSignature(params, secret);

                $http.post(url, params)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status) {
                        deferred.reject('Error ' + status + ' on HTTP request. Command: "' + params.Command + '"');
                        if (status === 401) {
                            $rootScope.$emit('ResponseUnauthorised');
                        }
                    });

                return deferred.promise;
            }

            return function(command, url) {
                var thisRequest = this;
                var params = {
                    Command: command
                };
                var secret = null;

                this.authenticate = function(sessionKey, sessionSecret) {
                    params.Session = sessionKey;
                    secret = sessionSecret;

                    return thisRequest;
                };

                this.bound = function(start, limit) {
                    params.Start = start;
                    params.Limit = limit;

                    return thisRequest;
                };

                this.byId = function(id) {
                    return this.addParam('ID', id);
                };

                this.byString = function(string) {
                    return this.addParam('String', string);
                };

                this.addParam = function(key, value) {
                    params[key] = value;

                    return thisRequest;
                };

                this.submit = function() {
                    return submitRequest(url, params, secret);
                };
            };
        }]);

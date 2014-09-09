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

            var httpRequests = {
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

            return {
                session: {
                    login: function (username, password) {
                        var deferred = $q.defer();

                        function getSession(token, username, password) {
                            var pswdHash = md5(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                            var authString = md5(token + ':' + username + ':' + pswdHash + ':' + token);
                            httpRequests.unauthenticated('GetSession', {
                                Token: token,
                                Authentication: authString
                            }).load().then(function (data) {
                                deferred.resolve(data);
                            }, function (message) {
                                deferred.reject(message);
                            });
                        }

                        httpRequests.unauthenticated('GetToken', {
                        }).load().then(function (data) {
                            getSession(data.Token, username, password);
                        }, function (message) {
                            deferred.reject(message);
                        });
                        return deferred.promise;
                    },
                    getUserPreferences: function() {
                        return httpRequests.authenticated('GetUserPreferences', {});
                    }
                },
                artist: {
                    getAll: function () {
                        return httpRequests.fetchAll('GetArtists', true);
                    }
                },
                album: {
                    getAll: function () {
                        return httpRequests.fetchAll('GetAlbums', true);
                    },
                    getFromArtist: function (id) {
                        return httpRequests.fetchByID('GetAlbumsByArtist', true, id);
                    }
                },
                track: {
                    getAll: function() {
                        return httpRequests.fetchAll('GetTracks', true);
                    },
                    getFromArtist: function(id) {
                        return httpRequests.fetchByID('GetTracksByArtist', true, id);
                    },
                    getFromAlbum: function(id) {
                        return httpRequests.fetchByID('GetTracksByAlbum', true, id);
                    },
                    convert: function(id) {
                        return httpRequests.fetchByString('ConvertTrackByID', false, id);
                    },
                    lastFMNowPlaying: function(id) {
                        return httpRequests.fetchByString('LFMNowPlayingTrack', false, id);
                    },
                    lastFMScrobble: function(id) {
                        return httpRequests.fetchByString('LFMScrobbleTrack', false, id);
                    }
                },
                search: {
                    all: function(limit, value) {
                        var _this = this;
                        return $q.all({
                            artists: _this.artists(limit, value),
                            albums: _this.albums(limit, value),
                            tracks: _this.tracks(limit, value)
                        });
                    },
                    artists: function(limit, value) {
                        var request = httpRequests.fetchByString('SearchArtists', true, value);
                        request.limit = limit;
                        return request.load();
                    },
                    albums: function(limit, value) {
                        var request = httpRequests.fetchByString('SearchAlbums', true, value);
                        request.limit = limit;
                        return request.load();
                    },
                    tracks: function(limit, value) {
                        var request = httpRequests.fetchByString('SearchTracks', true, value);
                        request.limit = limit;
                        return request.load();
                    }
                }
            };
        }]);

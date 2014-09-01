'use strict';

angular.module('musicServerApp')
    .factory('SearchRequest', ['$q', 'ArtistRequest', 'AlbumRequest', 'TrackRequest',
        function($q, ArtistRequest, AlbumRequest, TrackRequest) {
            return {
                all: function(limit, value) {
                    var _this = this;
                    var deferred = $q.defer();

                    _this.artists(limit, value).then(function(artists) {
                        _this.albums(limit, value).then(function(albums) {
                            _this.tracks(limit, value).then(function(tracks) {
                                deferred.resolve({
                                    artists: artists,
                                    albums: albums,
                                    tracks: tracks
                                });
                            }, deferred.reject);
                        }, deferred.reject);
                    }, deferred.reject);

                    return deferred.promise;
                },
                artists: function(limit, value) {
                    var request = ArtistRequest.search(value);
                    request.limit = limit;
                    return request.load();
                },
                albums: function(limit, value) {
                    var request = AlbumRequest.search(value);
                    request.limit = limit;
                    return request.load();
                },
                tracks: function(limit, value) {
                    var request = TrackRequest.search(value);
                    request.limit = limit;
                    return request.load();
                }
            };
        }]);

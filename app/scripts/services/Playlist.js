'use strict';

angular.module('musicServerApp')
    .factory('Playlist', ['$q', 'TrackRequest',
        function($q, TrackRequest) {
            function convertTrack(track) {
                if (track.ConversionPromise) {
                    return track.ConversionPromise;
                } else {
                    var deferred = $q.defer();
                    if (track.FileName) {
                        deferred.resolve(track);
                    } else {
                        track.ConversionPromise = deferred.promise;
                        TrackRequest.convert(track.ID).load().then(function(data) {
                            if (data.Result && data.Result === 'Success') {
                                track.FileName = data.FileName;
                                deferred.resolve(track);
                            } else {
                                deferred.reject();
                            }
                            delete track.ConversionPromise;
                        }, function(message) {
                            console.warn(message);
                            deferred.reject();
                            delete track.ConversionPromise;
                        });
                    }
                    return deferred.promise;
                }
            }

            return {
                trackArray: [],
                addTrack: function(track, position) {
                    if (position < 0) {
                        position = this.trackArray.length;
                    }
                    var copiedTrack = angular.copy(track);
                    copiedTrack.selected = false;
                    if (!this.trackArray.length) {
                        convertTrack(copiedTrack);
                    }
                    this.trackArray.splice(position, 0, copiedTrack);
                },
                addTracks: function(trackArray, relativeTrack, afterTrack) {
                    var position = this.trackArray.length;
                    if (relativeTrack) {
                        var index = this.trackArray.indexOf(relativeTrack);
                        if (index > -1) {
                            position = afterTrack ? index + 1 : index;
                        }
                    }
                    angular.forEach(trackArray, function(track) {
                        this.addTrack(track, position);
                        position++;
                    }, this);
                },
                addTracksByAlbum: function(albumId) {
                    var deferred = $q.defer();
                    var _this = this;
                    TrackRequest.getFromAlbum(albumId).load().then(function(tracks) {
                        _this.addTracks(tracks);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
                    return deferred.promise;
                },
                addTracksByArtist: function(artistId) {
                    var deferred = $q.defer();
                    var _this = this;
                    TrackRequest.getFromAlbum(artistId).load().then(function(tracks) {
                        _this.addTracks(tracks);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
                    return deferred.promise;
                },
                getTrack: function() {
                    var deferred = $q.defer();
                    if (this.trackArray.length) {
                        var track = this.trackArray.shift();
                        convertTrack(track).then(function(track) {
                            deferred.resolve(track);
                        }, function() {
                            deferred.reject();
                        });
                        if (this.trackArray.length) {
                            var nextTrack = this.trackArray[0];
                            setTimeout(function() {
                                convertTrack(nextTrack);
                            }, 5000);
                        }
                    } else {
                        deferred.reject();
                    }
                    return deferred.promise;
                },
                removeTrack: function(track) {
                    var index = this.trackArray.indexOf(track);
                    if (index > -1) {
                        this.trackArray.splice(index, 1);
                    }
                },
                removeTracks: function(trackArray) {
                    angular.forEach(trackArray, function(track) {
                        this.removeTrack(track);
                    }, this);
                },
                clear: function() {
                    this.trackArray.length = 0;
                },
                deselectAll: function() {
                    angular.forEach(this.trackArray, function(track) {
                        track.selected = false;
                    });
                }
            };
        }
    ]);
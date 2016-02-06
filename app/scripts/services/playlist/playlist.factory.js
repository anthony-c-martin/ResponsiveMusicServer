(function() {
    'use strict';

    angular.module('app.services.playlist')
        .factory('PlaylistFactory', PlaylistFactory);

    /* @ngInject */
    function PlaylistFactory(ApiFactory, $q) {
        return function() {
            var service = {};
            var tracks = [];

            function addTrack(trackToAdd, position) {
                if (position !== undefined) {
                    var relativeTrack = service.tracks[position];
                    service.addTracks([trackToAdd], relativeTrack, true);
                } else {
                    service.addTracks([trackToAdd]);
                }
            }

            function addTracks(tracksToAdd, relativeTrack, beforeRelativeTrack) {
                var index = tracks.length;
                if (relativeTrack && tracks.indexOf(relativeTrack) > -1) {
                    index = tracks.indexOf(relativeTrack);
                    index += (beforeRelativeTrack) ? 0 : 1;
                }

                var endChunk = tracks.slice(index, tracks.length);
                tracks.length = index;
                angular.forEach(tracksToAdd, function(track) {
                    var copiedTrack = angular.copy(track);
                    delete copiedTrack.selected;
                    tracks.push(copiedTrack);
                });
                angular.forEach(endChunk, function(track) {
                    tracks.push(track);
                });
            }

            function addTracksByAlbum(albumId) {
                var deferred = $q.defer();
                ApiFactory.track.getFromAlbum(albumId, 0, 1000)
                    .then(function(tracks) {
                        addTracks(tracks);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }

            function addTracksByArtist(artistId) {
                var deferred = $q.defer();
                ApiFactory.track.getFromArtist(artistId, 0, 1000)
                    .then(function(tracks) {
                        addTracks(tracks);
                        deferred.resolve();
                    }, function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }

            function removeTracks(tracksToRemove) {
                angular.forEach(tracksToRemove, function(track) {
                    var index = tracks.indexOf(track);
                    if (index > -1) {
                        tracks.splice(index, 1);
                    }
                });
            }

            function removeTrack(trackToRemove) {
                removeTracks([trackToRemove]);
            }

            function clear() {
                var copiedTracks = [];
                angular.forEach(tracks, function(track) {
                    copiedTracks.push(track);
                });
                removeTracks(copiedTracks);
            }

            function selectTracks(tracksToSelect) {
                angular.forEach(tracks, function(track) {
                    if (tracksToSelect.indexOf(track) === -1) {
                        delete track.selected;
                    } else {
                        track.selected = true;
                    }
                });
            }

            function getRelativeTo(track, before) {
                var index = tracks.indexOf(track);
                if (index > -1) {
                    index += before ? -1 : 1;
                }
                return tracks[index];
            }

            function deselectAll() {
                angular.forEach(tracks, function(track) {
                    delete track.selected;
                });
            }

            angular.extend(service, {
                tracks: tracks,
                addTrack: addTrack,
                addTracks: addTracks,
                addTracksByAlbum: addTracksByAlbum,
                addTracksByArtist: addTracksByArtist,
                selectTracks: selectTracks,
                removeTracks: removeTracks,
                removeTrack: removeTrack,
                clear: clear,
                getRelativeTo: getRelativeTo,
                deselectAll: deselectAll
            });

            return service;
        };
    }
})();

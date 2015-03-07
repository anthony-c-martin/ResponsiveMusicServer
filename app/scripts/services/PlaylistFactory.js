'use strict';

angular.module('musicServerApp')
    .factory('PlaylistFactory', [
        function() {
            return function() {
                var tracks = [];

                function addTracks(tracksToAdd, relativeTrack, beforeRelativeTrack) {
                    var index = tracks.length;
                    if (relativeTrack && tracks.indexOf(relativeTrack) > -1) {
                        index = tracks.indexOf(relativeTrack);
                        index += (beforeRelativeTrack) ? 0 : 1;
                    }

                    var endChunk = tracks.slice(index, tracks.length);
                    tracks.length = index;
                    angular.forEach(tracksToAdd, function(track) {
                        tracks.push(angular.copy(track));
                    });
                    angular.forEach(endChunk, function(track) {
                        tracks.push(track);
                    });
                }

                function removeTracks(tracksToRemove) {
                    angular.forEach(tracksToRemove, function(track) {
                        var index = tracks.indexOf(track);
                        if (index > -1) {
                            tracks.splice(index, 1);
                        }
                    });
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

                return {
                    tracks: tracks,
                    addTracks: addTracks,
                    selectTracks: selectTracks,
                    removeTracks: removeTracks,
                    getRelativeTo: getRelativeTo
                };
            };
        }]);

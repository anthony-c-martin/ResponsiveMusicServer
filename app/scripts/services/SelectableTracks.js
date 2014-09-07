'use strict';

angular.module('musicServerApp')
    .factory('SelectableTracks', [
        function() {
            return function() {
                function selectTracks(allTracks, newTracks, replaceSelected, invertIfSelected) {
                    angular.forEach(allTracks, function(track) {
                        if (replaceSelected && newTracks.indexOf(track) < 0 && track.selected) {
                            track.selected = false;
                        }
                        else if (newTracks.indexOf(track) >= 0) {
                            track.selected = (invertIfSelected) ? !track.selected : true;
                        }
                    });
                }

                return {
                    allTracks: [],
                    lastSelected: false,
                    trackSelected: function(track, shiftPressed, ctrlPressed) {
                        if (shiftPressed && this.lastSelected) {
                            var index = this.allTracks.indexOf(track);
                            var lastIndex = this.allTracks.indexOf(this.lastSelected);

                            var selectStart = (index > lastIndex) ? lastIndex : index;
                            var selectEnd = (index > lastIndex) ? index : lastIndex;

                            var tracksToAdd = [];
                            for (var i = selectStart; i <= selectEnd; i++) {
                                tracksToAdd.push(this.allTracks[i]);
                            }
                            selectTracks(this.allTracks, tracksToAdd, true, false);
                        }
                        else if (ctrlPressed && this.lastSelected) {
                            selectTracks(this.allTracks, [track], false, true);
                            this.lastSelected = track;
                        }
                        else if (!track.selected) {
                            selectTracks(this.allTracks, [track], true, false);
                            this.lastSelected = track;
                        }
                    },
                    listTracks: function() {
                        var tracks = [];
                        angular.forEach(this.allTracks, function(track) {
                            if (track.selected) {
                                tracks.push(track);
                            }
                        });
                        return tracks;
                    },
                    clearSelection: function() {
                        angular.forEach(this.allTracks, function(track) {
                            track.selected = false;
                        });
                    },
                    removeSelection: function() {
                        var tracks = this.listTracks();
                        for (var i = 0; i < tracks.length; i++) {
                            var index = this.allTracks.indexOf(tracks[i]);
                            if (index > -1) {
                                this.allTracks.splice(index, 1);
                            }
                        }
                    }
                };
            };
        }]);

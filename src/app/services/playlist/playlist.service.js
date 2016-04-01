System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PlaylistService;
    return {
        setters:[],
        execute: function() {
            PlaylistService = (function () {
                function PlaylistService() {
                }
                PlaylistService.prototype.addTrack = function (track, position) {
                    this.addTracks([track], position);
                };
                PlaylistService.prototype.addTracks = function (tracks, position) {
                    var _this = this;
                    if (position === undefined) {
                        position = this.tracks.length;
                    }
                    var endChunk = this.tracks.slice(position, this.tracks.length);
                    this.tracks.length = position;
                    tracks.forEach(function (track) {
                        _this.tracks.push(track.clone());
                    });
                    endChunk.forEach(function (track) {
                        _this.tracks.push(track);
                    });
                };
                PlaylistService.prototype.selectTracks = function (tracks) {
                    tracks.forEach(function (track) {
                        track.selected = true;
                    });
                };
                PlaylistService.prototype.removeTrack = function (track) {
                    var index = this.tracks.indexOf(track);
                    if (index > -1) {
                        this.tracks.splice(index, 1);
                    }
                };
                PlaylistService.prototype.removeTracks = function (tracks) {
                    var _this = this;
                    tracks.forEach(function (track) {
                        _this.removeTrack(track);
                    });
                };
                PlaylistService.prototype.removeAll = function () {
                    this.tracks.length = 0;
                };
                PlaylistService.prototype.unselectAll = function () {
                    this.tracks.forEach(function (track) {
                        delete track.selected;
                    });
                };
                return PlaylistService;
            }());
            exports_1("default", PlaylistService);
        }
    }
});
//# sourceMappingURL=playlist.service.js.map
System.register(['angular2/core', 'rxjs/observable', './trackmanager.service', '../session/session.service', '../playlist/playlist.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, observable_1, trackmanager_service_1, session_service_1, playlist_service_1;
    var PlayerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (observable_1_1) {
                observable_1 = observable_1_1;
            },
            function (trackmanager_service_1_1) {
                trackmanager_service_1 = trackmanager_service_1_1;
            },
            function (session_service_1_1) {
                session_service_1 = session_service_1_1;
            },
            function (playlist_service_1_1) {
                playlist_service_1 = playlist_service_1_1;
            }],
        execute: function() {
            PlayerService = (function () {
                function PlayerService(_trackManagerService, _sessionService) {
                    this._trackManagerService = _trackManagerService;
                    this._sessionService = _sessionService;
                    this._audioEl = new Audio();
                    this._playlist = new playlist_service_1.default();
                    this._historyPlaylist = new playlist_service_1.default();
                }
                PlayerService.prototype.nextTrack = function () {
                    var _this = this;
                    var nextTrack = this._playlist.tracks[0];
                    this._changeTrack(nextTrack).subscribe(function () { }, function () { }, function () {
                        _this._playlist.removeTrack(nextTrack);
                        if (_this._currentTrack) {
                            _this._historyPlaylist.addTrack(_this._currentTrack);
                        }
                        _this._currentTrack = nextTrack;
                        if (_this._playlist.tracks.length > 0) {
                            _this._trackManagerService.initConversion(_this._playlist.tracks[0]);
                        }
                    });
                };
                PlayerService.prototype.previousTrack = function () {
                    var _this = this;
                    if (this._currentTrack && this.getPosition() > 2) {
                        this.setPosition(0);
                        return;
                    }
                    var histPlaylistLength = this._historyPlaylist.tracks.length;
                    if (histPlaylistLength > 0) {
                        var prevTrack_1 = this._historyPlaylist.tracks[histPlaylistLength - 1];
                        this._changeTrack(prevTrack_1).subscribe(function () { }, function () { }, function () {
                            _this._historyPlaylist.removeTrack(prevTrack_1);
                            if (_this._currentTrack) {
                                _this._playlist.addTrack(_this._currentTrack);
                            }
                            _this._currentTrack = prevTrack_1;
                        });
                    }
                    else if (this._currentTrack) {
                        this._playlist.addTrack(this._currentTrack, 0);
                        this._currentTrack = null;
                        this._changeTrack(null);
                    }
                };
                PlayerService.prototype.setVolume = function (volume) {
                    this._audioEl.volume = volume;
                };
                PlayerService.prototype.getPosition = function () {
                    if (this._audioEl.readyState) {
                        return this._audioEl.currentTime;
                    }
                    return 0;
                };
                PlayerService.prototype.setPosition = function (position) {
                    if (this._audioEl.readyState) {
                        this._audioEl.currentTime = this._audioEl.duration * position;
                    }
                };
                PlayerService.prototype.setPlaying = function (play) {
                    if (play) {
                        this._audioEl.play();
                    }
                    else {
                        this._audioEl.pause();
                    }
                };
                PlayerService.prototype._changeTrack = function (track) {
                    var _this = this;
                    if (!track) {
                        this._sendTrackChange();
                        return observable_1.Observable.of(null);
                    }
                    var conversionResult = this._trackManagerService.initConversion(track);
                    conversionResult.subscribe(function (track) {
                        _this._sendTrackChange(track);
                        _this._trackManagerService.initScrobbling(track);
                    }, function () {
                        _this._sendTrackChange();
                    });
                    return conversionResult;
                };
                PlayerService.prototype._sendTrackChange = function (track) {
                    if (track !== undefined) {
                        var audioSrc = '/stream';
                        audioSrc += '?FileName=' + encodeURIComponent(track.FileName);
                        audioSrc += '&Session=' + encodeURIComponent(this._sessionService.get().Session);
                        this._audioEl.src = audioSrc;
                        this._audioEl.type = 'audio/mp4';
                    }
                    else {
                        this._audioEl.src = '';
                        this._audioEl.type = '';
                    }
                    this._audioEl.load();
                };
                PlayerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [trackmanager_service_1.default, session_service_1.default])
                ], PlayerService);
                return PlayerService;
            }());
            exports_1("default", PlayerService);
        }
    }
});
//# sourceMappingURL=player.service.js.map
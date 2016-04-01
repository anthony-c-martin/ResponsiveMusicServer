System.register(['angular2/core', 'rxjs/observable', 'rxjs/add/operator/map', '../session/session.service', '../api/api.service', '../player/tracktimer.service'], function(exports_1, context_1) {
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
    var core_1, observable_1, session_service_1, api_service_1, tracktimer_service_1;
    var TrackManagerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (observable_1_1) {
                observable_1 = observable_1_1;
            },
            function (_1) {},
            function (session_service_1_1) {
                session_service_1 = session_service_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (tracktimer_service_1_1) {
                tracktimer_service_1 = tracktimer_service_1_1;
            }],
        execute: function() {
            TrackManagerService = (function () {
                function TrackManagerService(_sessionService, _apiService) {
                    this._sessionService = _sessionService;
                    this._apiService = _apiService;
                }
                TrackManagerService.prototype.initConversion = function (track) {
                    if (track.FileName) {
                        return observable_1.Observable.of(track);
                    }
                    return this._apiService.convertTrack(track)
                        .map(function (data) {
                        if (data.Result !== 'Success') {
                            throw 'Conversion Failed';
                        }
                        track.FileName = data.FileName;
                        return track;
                    });
                };
                TrackManagerService.prototype.initScrobbling = function (track) {
                    var _this = this;
                    if (this._scrobbleTimer) {
                        this._scrobbleTimer.cancel();
                        this._scrobbleTimer = null;
                    }
                    if (!this._sessionService.getPrefs().ScrobblingEnabled) {
                        return;
                    }
                    var duration = (track.Duration / 2 < 240) ? (track.Duration / 2) : 240;
                    this._scrobbleTimer = new tracktimer_service_1.default(duration);
                    this._scrobbleTimer.promise().then(function () {
                        _this._apiService.lastFmScrobble(track);
                    });
                    this._apiService.lastFmNowPlaying(track);
                };
                TrackManagerService.prototype.toggleScrobbling = function (pause) {
                    if (this._scrobbleTimer) {
                        this._scrobbleTimer.toggle(pause);
                    }
                };
                TrackManagerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [session_service_1.default, api_service_1.default])
                ], TrackManagerService);
                return TrackManagerService;
            }());
            exports_1("default", TrackManagerService);
        }
    }
});
//# sourceMappingURL=trackmanager.service.js.map
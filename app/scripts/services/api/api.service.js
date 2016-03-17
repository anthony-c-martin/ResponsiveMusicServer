System.register(['angular2/core', 'angular2/http', '../session/session.service', './httprequest'], function(exports_1, context_1) {
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
    var core_1, http_1, session_service_1, httprequest_1;
    var ApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (session_service_1_1) {
                session_service_1 = session_service_1_1;
            },
            function (httprequest_1_1) {
                httprequest_1 = httprequest_1_1;
            }],
        execute: function() {
            ApiService = (function () {
                function ApiService(_http, _sessionService) {
                    this._http = _http;
                    this._sessionService = _sessionService;
                }
                ApiService.prototype.getAllArtists = function (start, limit) {
                    return this._apiRequest('GetArtists').bound(start, limit).submitAuth();
                };
                ApiService.prototype.searchArtists = function (search, start, limit) {
                    return this._apiRequest('SearchArtists').byString(search).bound(start, limit).submitAuth();
                };
                ApiService.prototype.getAllAlbums = function (start, limit) {
                    return this._apiRequest('GetAlbums').bound(start, limit).submitAuth();
                };
                ApiService.prototype.getAlbumsByArtist = function (artist, start, limit) {
                    return this._apiRequest('GetAlbumsByArtist').byId(artist.ID).bound(start, limit).submitAuth();
                };
                ApiService.prototype.searchAlbums = function (search, start, limit) {
                    return this._apiRequest('SearchAlbums').byString(search).bound(start, limit).submitAuth();
                };
                ApiService.prototype.getAllTracks = function (start, limit) {
                    return this._apiRequest('GetTracks').bound(start, limit).submitAuth();
                };
                ApiService.prototype.getTracksByArtist = function (artist, start, limit) {
                    return this._apiRequest('GetTracksByArtist').byId(artist.ID).bound(start, limit).submitAuth();
                };
                ApiService.prototype.getTracksByAlbum = function (album, start, limit) {
                    return this._apiRequest('GetTracksByAlbum').byId(album.ID).bound(start, limit).submitAuth();
                };
                ApiService.prototype.convertTrack = function (track) {
                    return this._apiRequest('ConvertTrackByID').byString(track.ID).submitAuth().toPromise();
                };
                ApiService.prototype.lastFMNowPlaying = function (track) {
                    return this._apiRequest('LFMNowPlayingTrack').byString(track.ID).submitAuth().toPromise();
                };
                ApiService.prototype.lastFMScrobble = function (track) {
                    return this._apiRequest('LFMScrobbleTrack').byString(track.ID).submitAuth().toPromise();
                };
                ApiService.prototype.searchTracks = function (search, start, limit) {
                    return this._apiRequest('SearchTracks').byString(search).bound(start, limit).submitAuth();
                };
                ApiService.prototype.getAuthToken = function () {
                    return this._apiRequest('GetToken').submitNoAuth().toPromise();
                };
                ApiService.prototype.getAuthSession = function (token, auth) {
                    return this._apiRequest('GetSession').addAuth(token, auth).submitNoAuth().toPromise();
                };
                ApiService.prototype.getUserPreferences = function () {
                    return this._apiRequest('GetUserPreferences').submitAuth();
                };
                ApiService.prototype._apiRequest = function (command) {
                    return new httprequest_1.default(this._http, this._sessionService, command);
                };
                ApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, session_service_1.default])
                ], ApiService);
                return ApiService;
            }());
            exports_1("default", ApiService);
        }
    }
});
//# sourceMappingURL=api.service.js.map
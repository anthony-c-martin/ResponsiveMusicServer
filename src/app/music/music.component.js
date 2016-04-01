System.register(['angular2/core', '../services/api/api.service', '../components/misc/scrollLoader.directive', '../components/artist/artist.component', '../components/album/album.component', '../components/track/track.component'], function(exports_1, context_1) {
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
    var core_1, api_service_1, scrollLoader_directive_1, artist_component_1, album_component_1, track_component_1;
    var MusicComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (scrollLoader_directive_1_1) {
                scrollLoader_directive_1 = scrollLoader_directive_1_1;
            },
            function (artist_component_1_1) {
                artist_component_1 = artist_component_1_1;
            },
            function (album_component_1_1) {
                album_component_1 = album_component_1_1;
            },
            function (track_component_1_1) {
                track_component_1 = track_component_1_1;
            }],
        execute: function() {
            MusicComponent = (function () {
                function MusicComponent(_apiService) {
                    this._apiService = _apiService;
                    this._shouldLoadMoreArtists = true;
                    this._shouldLoadMoreAlbums = true;
                    this._shouldLoadMoreTracks = true;
                    this.artists = [];
                    this.albums = [];
                    this.tracks = [];
                    this.loadMoreArtists();
                }
                MusicComponent.prototype.loadMoreArtists = function () {
                    var _this = this;
                    if (!this._shouldLoadMoreArtists) {
                        return;
                    }
                    this._shouldLoadMoreArtists = false;
                    this._apiService.getAllArtists(this.artists.length, 100).subscribe(function (artists) {
                        if (artists.length > 0) {
                            _this._shouldLoadMoreArtists = true;
                        }
                        while (artists.length > 0) {
                            _this.artists.push(artists.shift());
                        }
                    });
                };
                MusicComponent.prototype.loadMoreAlbums = function () {
                    var _this = this;
                    if (!this._shouldLoadMoreAlbums) {
                        return;
                    }
                    this._shouldLoadMoreAlbums = false;
                    this._apiService.getAllAlbums(this.albums.length, 100).subscribe(function (albums) {
                        if (albums.length > 0) {
                            _this._shouldLoadMoreAlbums = true;
                        }
                        while (albums.length > 0) {
                            _this.albums.push(albums.shift());
                        }
                    });
                };
                MusicComponent.prototype.loadMoreTracks = function () {
                    var _this = this;
                    if (!this._shouldLoadMoreTracks) {
                        return;
                    }
                    this._shouldLoadMoreTracks = false;
                    this._apiService.getAllTracks(this.tracks.length, 100).subscribe(function (tracks) {
                        if (tracks.length > 0) {
                            _this._shouldLoadMoreTracks = true;
                        }
                        while (tracks.length > 0) {
                            _this.tracks.push(tracks.shift());
                        }
                    });
                };
                MusicComponent = __decorate([
                    core_1.Component({
                        selector: 'am-music',
                        templateUrl: 'app/scripts/music/music.html',
                        directives: [scrollLoader_directive_1.default, artist_component_1.default, album_component_1.default, track_component_1.default]
                    }), 
                    __metadata('design:paramtypes', [api_service_1.default])
                ], MusicComponent);
                return MusicComponent;
            }());
            exports_1("default", MusicComponent);
        }
    }
});
//# sourceMappingURL=music.component.js.map
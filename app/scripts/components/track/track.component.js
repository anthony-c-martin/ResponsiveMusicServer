System.register(['angular2/core', '../../services/player/player.service'], function(exports_1, context_1) {
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
    var core_1, player_service_1;
    var TrackComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            }],
        execute: function() {
            TrackComponent = (function () {
                function TrackComponent(track) {
                    this.track = track;
                }
                TrackComponent.prototype.play = function () {
                    player_service_1.default.playlist.clear();
                    player_service_1.default.playlist.addTrack(this.track);
                    player_service_1.default.controlHooks.nextTrack();
                };
                TrackComponent.prototype.add = function () {
                    player_service_1.default.playlist.addTrack(this.track);
                };
                TrackComponent.prototype.remove = function () {
                    player_service_1.default.playlist.removeTrack(this.track);
                };
                TrackComponent = __decorate([
                    core_1.Component({
                        selector: 'am-track',
                        templateUrl: 'app/scripts/track/track.html'
                    }), 
                    __metadata('design:paramtypes', [Object])
                ], TrackComponent);
                return TrackComponent;
            }());
            exports_1("default", TrackComponent);
        }
    }
});
//TODO: Integrate with DraggableData
//TODO: Highlight when selected
//# sourceMappingURL=track.component.js.map
System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var TrackComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TrackComponent = (function () {
                function TrackComponent() {
                    this.remove = new core_1.EventEmitter();
                    this.play = new core_1.EventEmitter();
                    this.add = new core_1.EventEmitter();
                }
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TrackComponent.prototype, "remove", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TrackComponent.prototype, "play", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TrackComponent.prototype, "add", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TrackComponent.prototype, "track", void 0);
                TrackComponent = __decorate([
                    core_1.Component({
                        selector: 'am-track',
                        templateUrl: 'app/scripts/components/track/track.html'
                    }), 
                    __metadata('design:paramtypes', [])
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
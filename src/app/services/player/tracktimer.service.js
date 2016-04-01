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
    var TrackTimerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TrackTimerService = (function () {
                function TrackTimerService(_duration) {
                    var _this = this;
                    this._duration = _duration;
                    this._paused = false;
                    this._time = 0;
                    this._timer = 0;
                    this._timer = setInterval(function () {
                        if (!_this._paused) {
                            _this._time++;
                        }
                        if (_this._time >= _this._duration) {
                            clearInterval(_this._timer);
                            _this._resolvePromise();
                        }
                    }, 1000);
                    this._promise = new Promise(function (resolve, reject) {
                        _this._resolvePromise = resolve;
                        _this._rejectPromise = reject;
                    });
                }
                TrackTimerService.prototype.toggle = function (pause) {
                    this._paused = pause;
                };
                TrackTimerService.prototype.promise = function () {
                    return this._promise;
                };
                TrackTimerService.prototype.cancel = function () {
                    clearInterval(this._timer);
                    this._rejectPromise();
                };
                TrackTimerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Number])
                ], TrackTimerService);
                return TrackTimerService;
            }());
            exports_1("default", TrackTimerService);
        }
    }
});
//# sourceMappingURL=tracktimer.service.js.map
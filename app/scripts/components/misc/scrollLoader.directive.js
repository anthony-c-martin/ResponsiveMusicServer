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
    var ScrollLoaderDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ScrollLoaderDirective = (function () {
                function ScrollLoaderDirective(_element) {
                    this._element = _element;
                }
                ScrollLoaderDirective.prototype.onScroll = function () {
                    var raw = this._element.nativeElement;
                    if (raw.scrollTop + (raw.offsetHeight * 2) >= raw.scrollHeight) {
                        this.loadCallback();
                    }
                };
                __decorate([
                    core_1.Input('amScrollLoader'), 
                    __metadata('design:type', Function)
                ], ScrollLoaderDirective.prototype, "loadCallback", void 0);
                ScrollLoaderDirective = __decorate([
                    core_1.Directive({
                        selector: '[amScrollLoader]',
                        host: {
                            '(scroll)': 'onScroll()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ScrollLoaderDirective);
                return ScrollLoaderDirective;
            }());
            exports_1("default", ScrollLoaderDirective);
        }
    }
});
//# sourceMappingURL=scrollLoader.directive.js.map
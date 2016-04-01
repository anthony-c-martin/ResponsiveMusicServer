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
    var SessionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SessionService = (function () {
                function SessionService() {
                    this.apiUrl = '/api';
                }
                SessionService.prototype.set = function (session) {
                    sessionStorage['sessionKey'] = session.Session;
                    sessionStorage['sessionSecret'] = session.Secret;
                };
                SessionService.prototype.get = function () {
                    return { Session: sessionStorage['sessionKey'], Secret: sessionStorage['sessionSecret'] };
                };
                SessionService.prototype.exists = function () {
                    var session = this.get();
                    return !!(session.Session && session.Secret);
                };
                SessionService.prototype.clear = function () {
                    delete sessionStorage['sessionKey'];
                    delete sessionStorage['sessionSecret'];
                    delete sessionStorage['sessionPrefs'];
                };
                SessionService.prototype.getPrefs = function () {
                    var prefs = sessionStorage['sessionPrefs'] ? JSON.parse(sessionStorage['sessionPrefs']) : {};
                    return {
                        ScrobblingEnabled: !!prefs.ScrobblingEnabled
                    };
                };
                SessionService.prototype.setPrefs = function (prefs) {
                    sessionStorage['sessionPrefs'] = JSON.stringify(prefs);
                };
                SessionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SessionService);
                return SessionService;
            }());
            exports_1("default", SessionService);
        }
    }
});
//# sourceMappingURL=session.service.js.map
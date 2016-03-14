System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SessionService;
    return {
        setters:[],
        execute: function() {
            SessionService = (function () {
                function SessionService() {
                    this.apiUrl = '/api';
                }
                SessionService.prototype.set = function (session) {
                    sessionStorage['sessionKey'] = session.key;
                    sessionStorage['sessionSecret'] = session.secret;
                };
                SessionService.prototype.get = function () {
                    return { key: sessionStorage['sessionKey'], secret: sessionStorage['sessionSecret'] };
                };
                SessionService.prototype.exists = function () {
                    var session = this.get();
                    return !!(session.key && session.secret);
                };
                SessionService.prototype.clear = function () {
                    delete sessionStorage['sessionKey'];
                    delete sessionStorage['sessionSecret'];
                    delete sessionStorage['sessionPrefs'];
                };
                SessionService.prototype._setPrefs = function (prefs) {
                    sessionStorage['sessionPrefs'] = JSON.stringify(prefs);
                };
                SessionService.prototype._getPrefs = function () {
                    return (sessionStorage['sessionPrefs']) ? JSON.parse(sessionStorage['sessionPrefs']) : {};
                };
                SessionService.prototype.setPref = function (key, value) {
                    var prefs = this._getPrefs();
                    prefs[key] = value;
                    this._setPrefs(prefs);
                };
                SessionService.prototype.getPref = function (key) {
                    var prefs = this._getPrefs();
                    return prefs[key];
                };
                return SessionService;
            }());
            exports_1("SessionService", SessionService);
        }
    }
});
//# sourceMappingURL=session.service.js.map
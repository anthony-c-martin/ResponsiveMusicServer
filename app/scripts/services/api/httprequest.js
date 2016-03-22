System.register(['blueimp-md5', 'rxjs/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var blueimp_md5_1;
    var HttpRequest;
    return {
        setters:[
            function (blueimp_md5_1_1) {
                blueimp_md5_1 = blueimp_md5_1_1;
            },
            function (_1) {}],
        execute: function() {
            HttpRequest = (function () {
                function HttpRequest(_http, _sessionService, command) {
                    this._http = _http;
                    this._sessionService = _sessionService;
                    this._params = {};
                    this._addParam('Command', command);
                }
                HttpRequest.prototype.bound = function (start, limit) {
                    this._addParam('Start', start);
                    this._addParam('Limit', limit);
                    return this;
                };
                HttpRequest.prototype.byId = function (value) {
                    this._addParam('ID', value);
                    return this;
                };
                HttpRequest.prototype.byString = function (value) {
                    this._addParam('String', value);
                    return this;
                };
                HttpRequest.prototype.addAuth = function (token, auth) {
                    this._addParam('Token', token);
                    this._addParam('Authentication', auth);
                    return this;
                };
                HttpRequest.prototype.submitNoAuth = function () {
                    return this._submit(false);
                };
                HttpRequest.prototype.submitAuth = function () {
                    return this._submit(true);
                };
                HttpRequest.prototype._submit = function (auth) {
                    this._addParam('Signature', this._getSignature(auth));
                    return this._http
                        .post(this._sessionService.apiUrl, JSON.stringify(this._params))
                        .map(function (response) { return response.json(); });
                };
                HttpRequest.prototype._getSignature = function (auth) {
                    var keys = Object.keys(this._params).sort();
                    var sigString = keys.map(function (key) { return key + ':' + keys[key] + ';'; }).join();
                    if (auth) {
                        sigString += this._sessionService.get().Secret + ';';
                    }
                    return blueimp_md5_1.default(sigString);
                };
                HttpRequest.prototype._addParam = function (key, value) {
                    this._params[key] = value;
                };
                return HttpRequest;
            }());
            exports_1("default", HttpRequest);
        }
    }
});
//# sourceMappingURL=httprequest.js.map
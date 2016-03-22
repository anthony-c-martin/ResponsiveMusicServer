System.register(['angular2/core', 'blueimp-md5', 'angular2/router', '../services/api/api.service'], function(exports_1, context_1) {
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
    var core_1, blueimp_md5_1, router_1, api_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (blueimp_md5_1_1) {
                blueimp_md5_1 = blueimp_md5_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_routeParams, _apiService) {
                    this._routeParams = _routeParams;
                    this._apiService = _apiService;
                    this.model = { username: '', password: '' };
                    this.loginFail = new core_1.EventEmitter();
                    this.loginSuccess = new core_1.EventEmitter();
                    var auth = this._routeParams.get('auth');
                    var token = this._routeParams.get('token');
                    if (auth && token) {
                        this._getSession(auth, token);
                    }
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this._apiService.getAuthToken().then(function (data) {
                        var authString = _this._getAuthString(_this.model.username, _this.model.password, data.Token);
                        _this._getSession(data.Token, authString);
                    }, function () {
                        _this.loginFail.emit('GetToken request failed');
                    });
                };
                LoginComponent.prototype._getAuthString = function (username, password, token) {
                    var pswdHash = blueimp_md5_1.default(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                    return blueimp_md5_1.default(token + ':' + username + ':' + pswdHash + ':' + token);
                };
                LoginComponent.prototype._getSession = function (token, auth) {
                    var _this = this;
                    this._apiService.getAuthSession(token, auth).then(function (data) {
                        _this.loginSuccess.emit(data);
                    }, function () {
                        _this.loginFail.emit('GetSession request failed');
                    });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LoginComponent.prototype, "loginFail", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], LoginComponent.prototype, "loginSuccess", void 0);
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'am-login',
                        templateUrl: 'app/scripts/login/login.html',
                        providers: [api_service_1.default]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, api_service_1.default])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("default", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map
System.register(['angular2/core', 'blueimp-md5', 'angular2/router', '../services/api/api.service', '../services/error/error.service', '../services/session/session.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, blueimp_md5_1, router_1, api_service_1, error_service_1, session_service_1;
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
            },
            function (error_service_1_1) {
                error_service_1 = error_service_1_1;
            },
            function (session_service_1_1) {
                session_service_1 = session_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, _routeParams, _apiService, _errorService, _sessionService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._apiService = _apiService;
                    this._errorService = _errorService;
                    this._sessionService = _sessionService;
                    this.username = '';
                    this.password = '';
                    var auth = this._routeParams.get('auth');
                    var token = this._routeParams.get('token');
                    if (auth && token) {
                        this._getSession(auth, token);
                    }
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this._apiService.getAuthToken().subscribe(function (data) {
                        var authString = _this._getAuthString(_this.username, _this.password, data.Token);
                        _this._getSession(data.Token, authString);
                    }, function () {
                        _this._errorService.showError('Login attempt failed. Please try again.');
                    });
                };
                LoginComponent.prototype._getAuthString = function (username, password, token) {
                    var pswdHash = blueimp_md5_1.default(username + ':' + 'com.acm.AMMusicServer' + ':' + password);
                    return blueimp_md5_1.default(token + ':' + username + ':' + pswdHash + ':' + token);
                };
                LoginComponent.prototype._getSession = function (token, auth) {
                    var _this = this;
                    this._apiService.getAuthSession(token, auth).subscribe(function (data) {
                        _this._sessionService.set(data);
                        _this._router.navigate(['Music']);
                    }, function () {
                        _this._errorService.showError('Login attempt failed. Please try again.');
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'am-login',
                        templateUrl: 'app/scripts/login/login.html',
                        providers: [api_service_1.default]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, api_service_1.default, error_service_1.default, session_service_1.default])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("default", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map
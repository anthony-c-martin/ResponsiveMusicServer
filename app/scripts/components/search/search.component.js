System.register(['angular2/core', 'angular2/router', '../../services/api/api.service'], function(exports_1, context_1) {
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
    var core_1, router_1, api_service_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_router, _apiService) {
                    this._router = _router;
                    this._apiService = _apiService;
                    this.inProgress = false;
                    this.searchShown = false;
                }
                SearchComponent.prototype.search = function () {
                    var _this = this;
                    this.inProgress = true;
                    this.searchShown = true;
                    Promise.all([
                        this._apiService.searchArtists(this.searchText, 0, 5),
                        this._apiService.searchAlbums(this.searchText, 0, 5),
                        this._apiService.searchTracks(this.searchText, 0, 5)
                    ]).then(function (results) {
                        _this.artistsResult = results[0];
                        _this.albumsResult = results[1];
                        _this.tracksResult = results[2];
                        _this.inProgress = false;
                    }, function () {
                        _this.searchShown = false;
                        _this.inProgress = false;
                    });
                };
                SearchComponent.prototype.viewResults = function (type) {
                    var searchText = this.searchText;
                    this._router.navigate(['Search', { searchType: type, searchText: searchText }]);
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'am-search',
                        templateUrl: 'app/scripts/components/search/search.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, api_service_1.default])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("default", SearchComponent);
        }
    }
});
//TODO: Implement code to hide dropdowns
//# sourceMappingURL=search.component.js.map
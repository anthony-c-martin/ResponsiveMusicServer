System.register(['angular2/core', 'angular2/common', 'angular2/router', '../../services/api/api.service'], function(exports_1) {
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
    var core_1, common_1, router_1, api_service_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
                    var _this = this;
                    this._router = _router;
                    this._apiService = _apiService;
                    this.inProgress = false;
                    this.searchShown = false;
                    this.search = new common_1.Control('');
                    this.artists = this.search.valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .switchMap(function (search) { return _this._apiService.searchArtists(search, 0, 5); });
                    this.albums = this.search.valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .switchMap(function (search) { return _this._apiService.searchAlbums(search, 0, 5); });
                    this.tracks = this.search.valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .switchMap(function (search) { return _this._apiService.searchTracks(search, 0, 5); });
                }
                SearchComponent.prototype.viewResults = function (type) {
                    var searchText = this.search.value;
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
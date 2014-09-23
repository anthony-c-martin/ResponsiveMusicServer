'use strict';

describe('Directive: navbar', function() {

    var element,
        scope,
        $rootScope,
        $parentScope,
        $q,
        $compile;

    angular.module('musicServerAppMocks', ['musicServerApp'])
        .controller('PlayerController', [
            function() {

            }])
        .controller('SearchController', [
            function() {

            }]);

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            $q = $injector.get('$q');
            $compile = $injector.get('$compile');

            element = angular.element(
                '<div navbar></div>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('Initialisation', function() {
        /*it('should display properly', function() {

        });*/
    });
});
/*
'use strict';

angular.module('musicServerApp')
    .directive('navbar', [
        function() {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'views/navbar.partial.html'
            };
        }]);
*/
/*
<div class="navbar" ng-controller="PlayerController">
    <div ng-if="isPhone" class="navbar-inner">
        <div progress-container class="controls controls-nav shrinkable">
            <div ng-click="positionChange($event)" class="prog-container control">
                <div ng-style="{width: (position * 100) + '%'}" class="prog-bar"></div>
                <div ng-if="track" class="track-info">{{ track.Name }} - {{ track.Artist.Name }}</div>
            </div>
        </div>
    </div>
    <div class="navbar-inner">
        <div class="controls controls-nav unshrinkable">
            <button ng-click="next()" type="button" class="control">
                <span class="glyphicon glyphicon-fast-backward"></span>
            </button>
            <button ng-click="togglePause()" type="button" class="control">
                <span ng-if="!playing" class="glyphicon glyphicon-play"></span>
                <span ng-if="playing" class="glyphicon glyphicon-pause"></span>
            </button>
            <button ng-click="next()" type="button" class="control">
                <span class="glyphicon glyphicon-fast-forward"></span>
            </button>
        </div>
        <div ng-if="!isPhone" progress-container class="controls controls-nav shrinkable">
            <div ng-click="positionChange($event)" class="prog-container control">
                <div ng-style="{width: (position * 100) + '%'}" class="prog-bar"></div>
                <div ng-if="track" class="track-info">{{ track.Name }} - {{ track.Artist.Name }}</div>
            </div>
        </div>
        <div class="controls controls-nav unshrinkable">
            <div class="control-container">
                <button playlist-button ng-click="playlistShown = !playlistShown" ng-class="{active: playlistShown}" body-event-handler="playlist" type="button" class="control">
                    <span class="glyphicon glyphicon-list"></span>
                </button>
                <playlist ng-show="playlistShown"></playlist>
            </div>
            <div class="control-container">
                <button ng-click="volumeShown = !volumeShown" ng-class="{active: volumeShown}" body-event-handler="volume" type="button" class="control">
                    <span class="glyphicon glyphicon-volume-up"></span>
                </button>
                <volume-control ng-show="volumeShown"></volume-control>
            </div>
            <button ng-click="toggleScrobblingEnabled()" ng-class="{active: scrobblingEnabled}" type="button" class="control">
                <span class="lastfmicon"></span>
            </button>
        </div>
        <form ng-submit="search()" ng-controller="SearchController" body-event-handler="search" class="controls controls-nav shrinkable controls-search">
            <search ng-show="searchShown"></search>
            <input ng-model="searchText" class="control" type="text" placeholder="search" autocomplete="off">
            <button ng-class="{active: searchShown}" type="submit" class="control">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </form>
    </div>
    <audio-player></audio-player>
</div>
*/

'use strict';

describe('Directive: album', function() {

    beforeEach(module('musicServerApp'));

    var element,
        $scope, $rootScope, $q;

    beforeEach(inject(function(_$rootScope_, $compile, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        element = angular.element(
            '<ul class="albums">' +
                '<li album="album" ng-click="select()" ng-repeat="album in albums | limitTo: albums.length track by album.ID" ng-class="{selected: (album === selectedAlbum)}"></li>' +
            '</ul>'
        );

        $scope.albums = [{
            'ID' : 1,
            'Name' : 'Album 1'
        }, {
            'ID' : 2,
            'Name' : 'Album 2'
        }, {
            'ID' : 3,
            'Name' : 'Album 3'
        }, {
            'ID' : 4,
            'Name' : 'Album 4'
        }];

        $compile(element)($scope);
        $scope.$digest();
    }));
});

/*
angular.module('musicServerApp')
    .directive('album', ['DraggableData',
        function(DraggableData) {
            function linkFunction(scope, element) {
                scope.play = function($event) {
                    $event.stopPropagation();
                    scope.$emit('playAlbum', scope.album);
                };

                scope.add = function($event) {
                    $event.stopPropagation();
                    scope.$emit('addAlbum', scope.album);
                };

                scope.select = function() {
                    scope.$emit('selectAlbum', scope.album);
                };

                DraggableData.bindDragEvents(element, scope.album, 'Album', function() {
                    return [scope.album];
                }, function() {
                    return true;
                });
            }

            return {
                scope: {
                    'album': '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'views/album.partial.html',
                link: linkFunction
            };
        }]);
*/

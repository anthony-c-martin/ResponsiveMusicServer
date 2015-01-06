'use strict';

describe('Controller: AlbumController', function() {

    var controller,
        $scope,
        $rootScope,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('AlbumController', {
                $scope: $scope
            });
        });
    });

    describe('add', function() {
        it('should emit an addAlbum event and stop event propagation', function() {
            spyOn($scope, '$emit');
            var mockAlbum = {};
            controller.album = mockAlbum;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.add(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('addAlbum', mockAlbum);
            expect($scope.$emit.calls.count()).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('play', function() {
        it('should emit a playAlbum event and stop event propagation', function() {
            spyOn($scope, '$emit');
            var mockAlbum = {};
            controller.album = mockAlbum;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.play(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('playAlbum', mockAlbum);
            expect($scope.$emit.calls.count()).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();

        });
    });

    describe('select', function() {
        it('should emit a selectAlbum event', function() {
            spyOn($scope, '$emit');
            var mockAlbum = {};
            controller.album = mockAlbum;

            controller.select();

            expect($scope.$emit).toHaveBeenCalledWith('selectAlbum', mockAlbum);
            expect($scope.$emit.calls.count()).toBe(1);
        });
    });
});

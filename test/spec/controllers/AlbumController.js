'use strict';

describe('Controller: AlbumController', function() {

    beforeEach(module('musicServerApp'));

    var AlbumController,
        $scope, $rootScope, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        AlbumController = $controller('AlbumController', {
            $scope: $scope
        });
    }));

    it('should emit a playAlbum event and stop event propagation when the play function is called', function() {
        spyOn($scope, '$emit');
        var mockAlbum = {};
        $scope.album = mockAlbum;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.play(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('playAlbum', mockAlbum);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();

    });

    it('should emit an addAlbum event and stop event propagation when the add function is called', function() {
        spyOn($scope, '$emit');
        var mockAlbum = {};
        $scope.album = mockAlbum;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.add(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('addAlbum', mockAlbum);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should emit a selectAlbum event when the select function is called', function() {
        spyOn($scope, '$emit');
        var mockAlbum = {};
        $scope.album = mockAlbum;

        $scope.select();

        expect($scope.$emit).toHaveBeenCalledWith('selectAlbum', mockAlbum);
        expect($scope.$emit.callCount).toBe(1);
    });
});

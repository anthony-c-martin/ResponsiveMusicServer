'use strict';

describe('Controller: ArtistController', function() {

    beforeEach(module('musicServerApp'));

    var ArtistController,
        $scope, $rootScope, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        ArtistController = $controller('ArtistController', {
            $scope: $scope
        });
    }));

    it('should emit a playArtist event and stop event propagation when the play function is called', function() {
        spyOn($scope, '$emit');
        var mockArtist = {};
        $scope.artist = mockArtist;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.play(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('playArtist', mockArtist);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();

    });

    it('should emit an addArtist event and stop event propagation when the add function is called', function() {
        spyOn($scope, '$emit');
        var mockArtist = {};
        $scope.artist = mockArtist;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.add(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('addArtist', mockArtist);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should emit a selectArtist event when the select function is called', function() {
        spyOn($scope, '$emit');
        var mockArtist = {};
        $scope.artist = mockArtist;

        $scope.select();

        expect($scope.$emit).toHaveBeenCalledWith('selectArtist', mockArtist);
        expect($scope.$emit.callCount).toBe(1);
    });
});

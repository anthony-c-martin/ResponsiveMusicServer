'use strict';

describe('Controller: TrackController', function() {

    beforeEach(module('musicServerApp'));

    var TrackController,
        $scope, $rootScope, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        TrackController = $controller('TrackController', {
            $scope: $scope
        });
    }));

    it('should emit a playTrack event and stop event propagation when the play function is called', function() {
        spyOn($scope, '$emit');
        var mockTrack = {};
        $scope.track = mockTrack;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.play(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('playTrack', mockTrack);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();

    });

    it('should emit an addTrack event and stop event propagation when the add function is called', function() {
        spyOn($scope, '$emit');
        var mockTrack = {};
        $scope.track = mockTrack;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.add(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('addTrack', mockTrack);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should emit an removeTrack event and stop event propagation when the remove function is called', function() {
        spyOn($scope, '$emit');
        var mockTrack = {};
        $scope.track = mockTrack;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');

        $scope.remove(mockEvent);

        expect($scope.$emit).toHaveBeenCalledWith('removeTrack', mockTrack);
        expect($scope.$emit.callCount).toBe(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call trackSelected on the trackArea when the select function is called', function() {
        spyOn($scope, '$emit');
        var mockTrack = {};
        $scope.track = mockTrack;
        var mockEvent = {
            stopPropagation: function() {},
            shiftKey: true,
            ctrlKey: false,
            metaKey: true
        };
        spyOn(mockEvent, 'stopPropagation');
        var mockTrackArea = {
            trackSelected: function() {}
        };
        spyOn(mockTrackArea, 'trackSelected');
        $scope.trackArea = mockTrackArea;

        $scope.select(mockEvent);

        expect(mockEvent.stopPropagation).toHaveBeenCalled();
        expect(mockTrackArea.trackSelected).toHaveBeenCalledWith(mockTrack, true, true);
        expect(mockTrackArea.trackSelected.callCount).toBe(1);
    });

    it('should do nothing when the select function is called if the trackArea is not set', function() {
        spyOn($scope, '$emit');
        var mockTrack = {};
        $scope.track = mockTrack;
        var mockEvent = {
            stopPropagation: function() {}
        };
        spyOn(mockEvent, 'stopPropagation');
        $scope.trackArea = null;

        $scope.select(mockEvent);

        expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });
});

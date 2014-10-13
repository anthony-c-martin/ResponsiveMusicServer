'use strict';

describe('Controller: TrackController', function() {

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

            controller = $controller('TrackController', {
                $scope: $scope
            });
        });
    });

    describe('play', function() {
        it('should emit a playTrack event and stop event propagation when the play function is called', function() {
            spyOn($scope, '$emit');
            var mockTrack = {};
            controller.track = mockTrack;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.play(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('playTrack', mockTrack);
            expect($scope.$emit.callCount).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();

        });
    });

    describe('add', function() {
        it('should emit an addTrack event and stop event propagation when the add function is called', function() {
            spyOn($scope, '$emit');
            var mockTrack = {};
            controller.track = mockTrack;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.add(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('addTrack', mockTrack);
            expect($scope.$emit.callCount).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('remove', function() {
        it('should emit an removeTrack event and stop event propagation when the remove function is called', function() {
            spyOn($scope, '$emit');
            var mockTrack = {};
            controller.track = mockTrack;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');

            controller.remove(mockEvent);

            expect($scope.$emit).toHaveBeenCalledWith('removeTrack', mockTrack);
            expect($scope.$emit.callCount).toBe(1);
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('select', function() {
        it('should call trackSelected on the trackArea when the select function is called', function() {
            spyOn($scope, '$emit');
            var mockTrack = {};
            controller.track = mockTrack;
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
            controller.trackArea = mockTrackArea;

            controller.select(mockEvent);

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(mockTrackArea.trackSelected).toHaveBeenCalledWith(mockTrack, true, true);
            expect(mockTrackArea.trackSelected.callCount).toBe(1);
        });

        it('should do nothing when the select function is called if the trackArea is not set', function() {
            spyOn($scope, '$emit');
            var mockTrack = {};
            controller.track = mockTrack;
            var mockEvent = {
                stopPropagation: function() {}
            };
            spyOn(mockEvent, 'stopPropagation');
            controller.trackArea = null;

            controller.select(mockEvent);

            expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
        });
    });
});

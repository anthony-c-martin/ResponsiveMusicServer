'use strict';

describe('Controller: TrackController', function() {

    var controller,
        $scope,
        $rootScope,
        PlayerService,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            PlayerService = $injector.get('PlayerService');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('TrackController', {
                $scope: $scope,
                PlayerService: PlayerService
            });
        });

        $scope.track = {
            ID: 362
        };
    });

    describe('play', function() {
        it('should clear the playlist, call addTrack on the playlist, and then select the next track', function() {
            spyOn(PlayerService.playlist, 'clear');
            spyOn(PlayerService.playlist, 'addTrack').and.returnValue($q.when());
            spyOn(PlayerService.controlHooks, 'nextTrack');

            controller.play();

            expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
            expect(PlayerService.playlist.addTrack).toHaveBeenCalledWith($scope.track);
            $scope.$digest();
            expect(PlayerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('add', function() {
        it('should call addTrack on the playlist', function() {
            spyOn(PlayerService.playlist, 'addTrack');

            controller.add();

            expect(PlayerService.playlist.addTrack).toHaveBeenCalledWith($scope.track);
        });
    });

    describe('remove', function() {
        it('should call removeTrack on the playlist', function() {
            spyOn(PlayerService.playlist, 'removeTrack');

            controller.remove();

            expect(PlayerService.playlist.removeTrack).toHaveBeenCalledWith($scope.track);
        });
    });

    describe('select', function() {
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

            controller.select(mockEvent);

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(mockTrackArea.trackSelected).toHaveBeenCalledWith(mockTrack, true, true);
            expect(mockTrackArea.trackSelected.calls.count()).toBe(1);
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

            controller.select(mockEvent);

            expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
        });
    });
});

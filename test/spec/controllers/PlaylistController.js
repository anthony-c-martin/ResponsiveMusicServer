'use strict';

describe('Controller: PlaylistController', function() {

    var controller,
        SelectableTracks,
        PlayerService,
        $scope,
        $rootScope,
        $q;

    var mockSelectableTracks = {
        removeSelection: function() {}
    };

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            SelectableTracks = jasmine.createSpy('SelectableTracksSpy').and.returnValue(mockSelectableTracks);
            PlayerService = {
                playlist: jasmine.createSpyObj('playlist', ['removeTrack', 'clear'])
            };

            var $controller = $injector.get('$controller');

            controller = $controller('PlaylistController', {
                $scope: $scope,
                PlayerService: PlayerService,
                SelectableTracks: SelectableTracks
            });
        });
    });

    describe('initialisation', function() {
        it('should create a new SelectableTracks object and set the allTracks array to the playlist tracks', function() {
            expect(SelectableTracks).toHaveBeenCalledWith();
            expect(SelectableTracks.calls.count()).toBe(1);

            expect($scope.trackArea).toBe(mockSelectableTracks);
            expect($scope.trackArea.allTracks).toBe(controller.playlist.tracks);
        });
    });

    describe('removeTrack', function() {
        it('should call removeTrack on the playlist object', function() {
            var mockTrack = {};

            controller.removeTrack(mockTrack);

            expect(PlayerService.playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
            expect(PlayerService.playlist.removeTrack.calls.count()).toBe(1);
        });
    });

    describe('removeAll', function() {
        it('should call clear on the playlist object', function() {
            controller.removeAll();

            expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
            expect(PlayerService.playlist.clear.calls.count()).toBe(1);
        });
    });

    describe('removeSelection', function() {
        it('should call removeSelection on the SelectableTracks object', function() {
            spyOn($scope.trackArea, 'removeSelection');

            controller.removeSelection();

            expect($scope.trackArea.removeSelection).toHaveBeenCalledWith();
            expect($scope.trackArea.removeSelection.calls.count()).toBe(1);
        });
    });

});

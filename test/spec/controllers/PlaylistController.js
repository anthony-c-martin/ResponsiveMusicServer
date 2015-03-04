'use strict';

describe('Controller: PlaylistController', function() {

    var controller,
        SelectableTracks,
        Playlist,
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
            Playlist = $injector.get('Playlist');

            var $controller = $injector.get('$controller');

            controller = $controller('PlaylistController', {
                $scope: $scope,
                Playlist: Playlist,
                SelectableTracks: SelectableTracks
            });
        });
    });

    it('should create a new SelectableTracks object and set the allTracks array to the playlist trackArray', function() {
        expect(SelectableTracks).toHaveBeenCalledWith();
        expect(SelectableTracks.calls.count()).toBe(1);

        expect($scope.trackArea).toBe(mockSelectableTracks);
        expect($scope.trackArea.allTracks).toBe(Playlist.trackArray);
    });

    it('should set the playlist scope variable to the playlist trackArray', function() {
        expect(controller.playlist).toBe(Playlist.trackArray);
    });

    it('should call Playlist.removeTrack when removeTrack is called', function() {
        spyOn(Playlist, 'removeTrack');
        var mockTrack = {};

        controller.removeTrack(mockTrack);

        expect(Playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
        expect(Playlist.removeTrack.calls.count()).toBe(1);
    });

    it('should call Playlist.clear when removeAll is called', function() {
        spyOn(Playlist, 'clear');

        controller.removeAll();

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.calls.count()).toBe(1);
    });

    it('should call playlistArea.removeSelection when removeSelection is called', function() {
        spyOn($scope.trackArea, 'removeSelection');

        controller.removeSelection();

        expect($scope.trackArea.removeSelection).toHaveBeenCalledWith();
        expect($scope.trackArea.removeSelection.calls.count()).toBe(1);
    });
});

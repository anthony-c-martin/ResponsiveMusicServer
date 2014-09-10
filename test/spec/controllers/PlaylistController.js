'use strict';

describe('Controller: PlaylistController', function() {

    var mockSelectableTracks = {
        removeSelection: function() {}
    };
    beforeEach(module('musicServerApp', function($provide) {
        $provide.value('SelectableTracks', jasmine.createSpy('SelectableTracksSpy').andCallFake(function() {
            return mockSelectableTracks;
        }));
    }));

    var PlaylistController,
        $scope, $rootScope, SelectableTracks, Playlist, $q;

    beforeEach(inject(function($controller, _$rootScope_, _SelectableTracks_, _Playlist_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        SelectableTracks = _SelectableTracks_;
        Playlist = _Playlist_;

        PlaylistController = $controller('PlaylistController', {
            $scope: $scope,
            Playlist: _Playlist_,
            SelectableTracks: _SelectableTracks_
        });
    }));

    it('should create a new SelectableTracks object and set the allTracks array to the playlist trackArray', function() {
        expect(SelectableTracks).toHaveBeenCalledWith();
        expect(SelectableTracks.callCount).toBe(1);

        expect($scope.playlistArea).toBe(mockSelectableTracks);
        expect($scope.playlistArea.allTracks).toBe(Playlist.trackArray);
    });

    it('should set the playlist scope variable to the playlist trackArray', function() {
        expect($scope.playlist).toBe(Playlist.trackArray);
    });

    it('should call Playlist.removeTrack when removeTrack is called', function() {
        spyOn(Playlist, 'removeTrack');
        var mockTrack = {};

        $scope.removeTrack(mockTrack);

        expect(Playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
        expect(Playlist.removeTrack.callCount).toBe(1);
    });

    it('should call Playlist.clear when removeAll is called', function() {
        spyOn(Playlist, 'clear');

        $scope.removeAll();

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);
    });

    it('should call playlistArea.removeSelection when removeSelection is called', function() {
        spyOn($scope.playlistArea, 'removeSelection');

        $scope.removeSelection();

        expect($scope.playlistArea.removeSelection).toHaveBeenCalledWith();
        expect($scope.playlistArea.removeSelection.callCount).toBe(1);
    });
});

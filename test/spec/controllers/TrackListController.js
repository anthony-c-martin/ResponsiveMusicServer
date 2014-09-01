'use strict';

describe('Controller: TrackListController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var TrackListController,
        rootScope, scope, mockPlaylist;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockPlaylist = {
            addTracks: function() {},
            clear: function() {}
        };

        TrackListController = $controller('TrackListController', {
            $scope: scope,
            Playlist: mockPlaylist
        });
    }));

    it('should add playlist tracks on the addArtist event', function() {
        spyOn(mockPlaylist, 'addTracks');
        var mockTrack = {
            ID: 123
        };

        scope.$emit('addTrack', mockTrack);
        expect(mockPlaylist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(mockPlaylist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);
        expect(mockPlaylist.addTracks.callCount).toBe(1);
    });

    it('should play playlist tracks on the playArtist event', function() {
        spyOn(mockPlaylist, 'clear');
        spyOn(mockPlaylist, 'addTracks');
        spyOn(scope, '$emit').andCallThrough();
        var mockTrack = {
            ID: 123
        };

        scope.$emit('playTrack', mockTrack);
        expect(mockPlaylist.clear).toHaveBeenCalledWith();
        expect(mockPlaylist.clear.callCount).toBe(1);
        expect(mockPlaylist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(mockPlaylist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);
        expect(mockPlaylist.addTracks.callCount).toBe(1);

        expect(scope.$emit).toHaveBeenCalledWith('StartPlaying');
    });
});
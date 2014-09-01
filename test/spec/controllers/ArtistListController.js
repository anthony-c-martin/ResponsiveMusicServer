'use strict';

describe('Controller: ArtistListController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var ArtistListController,
        rootScope, scope, mockPlaylist;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $q) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockPlaylist = {
            addTracksByArtist: function() {},
            clear: function() {}
        };
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(mockPlaylist, 'addTracksByArtist').andReturn(deferred.promise);

        ArtistListController = $controller('ArtistListController', {
            $scope: scope,
            Playlist: mockPlaylist
        });
    }));

    it('should add playlist tracks on the addArtist event', function() {
        var mockArtist = {
            ID: 123
        };

        scope.$emit('addArtist', mockArtist);
        expect(mockPlaylist.addTracksByArtist).toHaveBeenCalledWith(mockArtist.ID);
        expect(mockPlaylist.addTracksByArtist.callCount).toBe(1);
    });

    it('should play playlist tracks on the playArtist event', function() {
        spyOn(mockPlaylist, 'clear');
        var mockArtist = {
            ID: 123
        };

        scope.$emit('playArtist', mockArtist);
        expect(mockPlaylist.clear).toHaveBeenCalledWith();
        expect(mockPlaylist.clear.callCount).toBe(1);
        expect(mockPlaylist.addTracksByArtist).toHaveBeenCalledWith(mockArtist.ID);
        expect(mockPlaylist.addTracksByArtist.callCount).toBe(1);

        spyOn(scope, '$emit');
        rootScope.$digest();
        expect(scope.$emit).toHaveBeenCalledWith('StartPlaying');
    });

    it('should emit a single loadAlbums event when showAlbums is called', function() {
        spyOn(scope, '$emit');
        scope.showAlbums(123);
        expect(scope.$emit).toHaveBeenCalledWith('loadAlbums', 123);
        expect(scope.$emit.callCount).toBe(1);
    });
});
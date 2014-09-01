'use strict';

describe('Controller: AlbumListController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var AlbumListController,
        rootScope, scope, mockPlaylist;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $q) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockPlaylist = {
            addTracksByAlbum: function() {},
            clear: function() {}
        };
        var deferred = $q.defer();
        deferred.resolve();
        spyOn(mockPlaylist, 'addTracksByAlbum').andReturn(deferred.promise);

        AlbumListController = $controller('AlbumListController', {
            $scope: scope,
            Playlist: mockPlaylist
        });
    }));

    it('should add playlist tracks on the addAlbum event', function() {
        var mockAlbum = {
            ID: 123
        };

        scope.$emit('addAlbum', mockAlbum);
        expect(mockPlaylist.addTracksByAlbum).toHaveBeenCalledWith(mockAlbum.ID);
        expect(mockPlaylist.addTracksByAlbum.callCount).toBe(1);
    });

    it('should play playlist tracks on the playAlbum event', function() {
        spyOn(mockPlaylist, 'clear');
        var mockAlbum = {
            ID: 123
        };

        scope.$emit('playAlbum', mockAlbum);
        expect(mockPlaylist.clear).toHaveBeenCalledWith();
        expect(mockPlaylist.clear.callCount).toBe(1);
        expect(mockPlaylist.addTracksByAlbum).toHaveBeenCalledWith(mockAlbum.ID);
        expect(mockPlaylist.addTracksByAlbum.callCount).toBe(1);

        spyOn(scope, '$emit');
        rootScope.$digest();
        expect(scope.$emit).toHaveBeenCalledWith('StartPlaying');
    });
});
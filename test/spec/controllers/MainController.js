'use strict';

describe('Controller: MainController', function() {

    beforeEach(module('musicServerApp'));
    var artistGetAllOutput = {};
    var mockDataLoader = {
        fetch: function() {}
    };

    beforeEach(module('musicServerApp', function($provide) {
        $provide.value('DataLoader', jasmine.createSpy('DataLoaderSpy').andReturn(mockDataLoader));
    }));

    var MainController,
        $scope, $rootScope, DataLoader, Playlist, ApiRequest, $q;

    beforeEach(inject(function($controller, _$rootScope_, _DataLoader_, _Playlist_, _ApiRequest_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        DataLoader = _DataLoader_;
        Playlist = _Playlist_;
        ApiRequest = _ApiRequest_;
        $q = _$q_;

        spyOn(ApiRequest.artist, 'getAll').andReturn(artistGetAllOutput);

        MainController = $controller('MainController', {
            $rootScope: $rootScope,
            $scope: $scope,
            DataLoader: _DataLoader_,
            Playlist: _Playlist_,
            ApiRequest: _ApiRequest_
        });
    }));

    it('should initialise artists, albums and tracks on start', function() {
        expect($scope.artists).toEqual([]);
        expect($scope.albums).toEqual([]);
        expect($scope.tracks).toEqual([]);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockArtist = {
            ID: 28764
        };
        spyOn(Playlist, 'addTracksByArtist');

        $rootScope.$emit('addArtist', mockArtist);

        expect(Playlist.addTracksByArtist).toHaveBeenCalledWith(28764);
        expect(Playlist.addTracksByArtist.callCount).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockArtist = {
            ID: 12525
        };
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracksByArtist').andReturn($q.when());
        spyOn($scope, '$emit');

        $rootScope.$emit('playArtist', mockArtist);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);
        expect(Playlist.addTracksByArtist).toHaveBeenCalledWith(12525);
        expect(Playlist.addTracksByArtist.callCount).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockAlbum = {
            ID: 23166
        };
        spyOn(Playlist, 'addTracksByAlbum');

        $rootScope.$emit('addAlbum', mockAlbum);

        expect(Playlist.addTracksByAlbum).toHaveBeenCalledWith(23166);
        expect(Playlist.addTracksByAlbum.callCount).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockAlbum = {
            ID: 43764
        };
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracksByAlbum').andReturn($q.when());
        spyOn($scope, '$emit');

        $rootScope.$emit('playAlbum', mockAlbum);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);
        expect(Playlist.addTracksByAlbum).toHaveBeenCalledWith(43764);
        expect(Playlist.addTracksByAlbum.callCount).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });

    it('should add a track to the playlist on the addTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'addTracks');

        $rootScope.$emit('addTrack', mockTrack);

        expect(Playlist.addTracks).toHaveBeenCalled();
        expect(Playlist.addTracks.callCount).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0].length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);
    });

    it('should remove a track from the playlist on the removeTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'removeTrack');

        $rootScope.$emit('removeTrack', mockTrack);

        expect(Playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
        expect(Playlist.removeTrack.callCount).toBe(1);
    });

    it('should clear the playlist, add a track to it, and then emit a StartPlaying event on the playTrack event', function() {
        var mockTrack = {};
        spyOn(Playlist, 'clear');
        spyOn(Playlist, 'addTracks');
        spyOn($scope, '$emit');

        $rootScope.$emit('playTrack', mockTrack);

        expect(Playlist.clear).toHaveBeenCalledWith();
        expect(Playlist.clear.callCount).toBe(1);

        expect(Playlist.addTracks).toHaveBeenCalled();
        expect(Playlist.addTracks.callCount).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args.length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0].length).toBe(1);
        expect(Playlist.addTracks.mostRecentCall.args[0][0]).toBe(mockTrack);

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.callCount).toBe(1);
    });

    it('should set the artistRequest scope variable on start', function() {
        expect(ApiRequest.artist.getAll).toHaveBeenCalledWith();
        expect(ApiRequest.artist.getAll.callCount).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(artistGetAllOutput, $scope.artists, 100);
        expect(DataLoader.callCount).toBe(1);

        expect($scope.artistRequest).toBe(mockDataLoader);
    });

    it('should load albums by the given artist on the selectArtist event', function() {
        DataLoader.reset();
        var getFromArtistOutput = {};
        spyOn(ApiRequest.album, 'getFromArtist').andReturn(getFromArtistOutput);
        spyOn(mockDataLoader, 'fetch');
        var mockArtist = {
            ID: 12987
        };

        $scope.albumRequest = null;
        $rootScope.$emit('selectArtist', mockArtist);

        expect(ApiRequest.album.getFromArtist).toHaveBeenCalledWith(12987);
        expect(ApiRequest.album.getFromArtist.callCount).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(getFromArtistOutput, $scope.albums, 100);
        expect(DataLoader.callCount).toBe(1);

        expect($scope.albumRequest).toBe(mockDataLoader);
        expect(mockDataLoader.fetch).toHaveBeenCalledWith();
        expect(mockDataLoader.fetch.callCount).toBe(1);

        expect($scope.trackRequest).toBeNull();
    });

    it('should load tracks for the given album on the selectAlbum event', function() {
        DataLoader.reset();
        var getFromAlbumOutput = {};
        spyOn(ApiRequest.track, 'getFromAlbum').andReturn(getFromAlbumOutput);
        spyOn(mockDataLoader, 'fetch');
        var mockAlbum = {
            ID: 125225
        };

        $scope.trackRequest = null;
        $rootScope.$emit('selectAlbum', mockAlbum);

        expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(125225);
        expect(ApiRequest.track.getFromAlbum.callCount).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(getFromAlbumOutput, $scope.tracks, 100);
        expect(DataLoader.callCount).toBe(1);

        expect($scope.trackRequest).toBe(mockDataLoader);
        expect(mockDataLoader.fetch).toHaveBeenCalledWith();
        expect(mockDataLoader.fetch.callCount).toBe(1);
    });
});

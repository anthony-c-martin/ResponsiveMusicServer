'use strict';

describe('Controller: MainController', function() {

    var controller,
        DataLoader,
        PlayerService,
        ApiRequest,
        $rootScope,
        $scope,
        $q;

    var artistGetAllOutput = {};
    var mockDataLoader = {
        fetch: function() {},
    };

    beforeEach(function() {
        module('musicServerApp', function($provide) {
            $provide.value('DataLoader', jasmine.createSpy('DataLoaderSpy').and.returnValue(mockDataLoader));
        });

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $scope = $rootScope.$new();
            DataLoader = $injector.get('DataLoader');
            PlayerService = $injector.get('PlayerService');
            ApiRequest = $injector.get('ApiRequest');
            var $controller = $injector.get('$controller');

            spyOn(ApiRequest.artist, 'getAll').and.returnValue(artistGetAllOutput);

            controller = $controller('MainController', {
                $rootScope: $rootScope,
                $scope: $scope,
                DataLoader: DataLoader,
                PlayerService: PlayerService,
                ApiRequest: ApiRequest
            });
        });
    });

    it('should initialise artists, albums and tracks on start', function() {
        expect(controller.artists).toEqual([]);
        expect(controller.albums).toEqual([]);
        expect(controller.tracks).toEqual([]);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockArtist = {
            ID: 28764
        };
        spyOn(PlayerService.playlist, 'addTracksByArtist');

        $rootScope.$emit('addArtist', mockArtist);

        expect(PlayerService.playlist.addTracksByArtist).toHaveBeenCalledWith(28764);
        expect(PlayerService.playlist.addTracksByArtist.calls.count()).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockArtist = {
            ID: 12525
        };
        spyOn(PlayerService.playlist, 'clear');
        spyOn(PlayerService.playlist, 'addTracksByArtist').and.returnValue($q.when());
        spyOn($scope, '$emit');

        $rootScope.$emit('playArtist', mockArtist);

        expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
        expect(PlayerService.playlist.clear.calls.count()).toBe(1);
        expect(PlayerService.playlist.addTracksByArtist).toHaveBeenCalledWith(12525);
        expect(PlayerService.playlist.addTracksByArtist.calls.count()).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.calls.count()).toBe(1);
    });

    it('should add tracks to the playlist on the addArtist event', function() {
        var mockAlbum = {
            ID: 23166
        };
        spyOn(PlayerService.playlist, 'addTracksByAlbum');

        $rootScope.$emit('addAlbum', mockAlbum);

        expect(PlayerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(23166);
        expect(PlayerService.playlist.addTracksByAlbum.calls.count()).toBe(1);
    });

    it('should clear the playlist, add tracks to it, and then emit a StartPlaying event on the playArtist event', function() {
        var mockAlbum = {
            ID: 43764
        };
        spyOn(PlayerService.playlist, 'clear');
        spyOn(PlayerService.playlist, 'addTracksByAlbum').and.returnValue($q.when());
        spyOn($scope, '$emit');

        $rootScope.$emit('playAlbum', mockAlbum);

        expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
        expect(PlayerService.playlist.clear.calls.count()).toBe(1);
        expect(PlayerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(43764);
        expect(PlayerService.playlist.addTracksByAlbum.calls.count()).toBe(1);

        $scope.$digest();

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.calls.count()).toBe(1);
    });

    it('should add a track to the playlist on the addTrack event', function() {
        var mockTrack = {};
        spyOn(PlayerService.playlist, 'addTracks');

        $rootScope.$emit('addTrack', mockTrack);

        expect(PlayerService.playlist.addTracks).toHaveBeenCalled();
        expect(PlayerService.playlist.addTracks.calls.count()).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args.length).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args[0].length).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args[0][0]).toBe(mockTrack);
    });

    it('should remove a track from the playlist on the removeTrack event', function() {
        var mockTrack = {};
        spyOn(PlayerService.playlist, 'removeTrack');

        $rootScope.$emit('removeTrack', mockTrack);

        expect(PlayerService.playlist.removeTrack).toHaveBeenCalledWith(mockTrack);
        expect(PlayerService.playlist.removeTrack.calls.count()).toBe(1);
    });

    it('should clear the playlist, add a track to it, and then emit a StartPlaying event on the playTrack event', function() {
        var mockTrack = {};
        spyOn(PlayerService.playlist, 'clear');
        spyOn(PlayerService.playlist, 'addTracks');
        spyOn($scope, '$emit');

        $rootScope.$emit('playTrack', mockTrack);

        expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
        expect(PlayerService.playlist.clear.calls.count()).toBe(1);

        expect(PlayerService.playlist.addTracks).toHaveBeenCalled();
        expect(PlayerService.playlist.addTracks.calls.count()).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args.length).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args[0].length).toBe(1);
        expect(PlayerService.playlist.addTracks.calls.mostRecent().args[0][0]).toBe(mockTrack);

        expect($scope.$emit).toHaveBeenCalledWith('StartPlaying');
        expect($scope.$emit.calls.count()).toBe(1);
    });

    it('should set the artistRequest scope variable on start', function() {
        expect(ApiRequest.artist.getAll).toHaveBeenCalledWith();
        expect(ApiRequest.artist.getAll.calls.count()).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(artistGetAllOutput, controller.artists, 100);
        expect(DataLoader.calls.count()).toBe(1);

        expect($scope.artistRequest).toBe(mockDataLoader);
    });

    it('should load albums by the given artist on the selectArtist event', function() {
        DataLoader.calls.reset();
        var getFromArtistOutput = {};
        spyOn(ApiRequest.album, 'getFromArtist').and.returnValue(getFromArtistOutput);
        spyOn(mockDataLoader, 'fetch');
        var mockArtist = {
            ID: 12987
        };

        $scope.albumRequest = null;
        $rootScope.$emit('selectArtist', mockArtist);

        expect(ApiRequest.album.getFromArtist).toHaveBeenCalledWith(12987);
        expect(ApiRequest.album.getFromArtist.calls.count()).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(getFromArtistOutput, controller.albums, 100);
        expect(DataLoader.calls.count()).toBe(1);

        expect($scope.albumRequest).toBe(mockDataLoader);
        expect(mockDataLoader.fetch).toHaveBeenCalledWith();
        expect(mockDataLoader.fetch.calls.count()).toBe(1);

        expect($scope.trackRequest).toBeNull();
    });

    it('should load tracks for the given album on the selectAlbum event', function() {
        DataLoader.calls.reset();
        var getFromAlbumOutput = {};
        spyOn(ApiRequest.track, 'getFromAlbum').and.returnValue(getFromAlbumOutput);
        spyOn(mockDataLoader, 'fetch');
        var mockAlbum = {
            ID: 125225
        };

        $scope.trackRequest = null;
        $rootScope.$emit('selectAlbum', mockAlbum);

        expect(ApiRequest.track.getFromAlbum).toHaveBeenCalledWith(125225);
        expect(ApiRequest.track.getFromAlbum.calls.count()).toBe(1);

        expect(DataLoader).toHaveBeenCalledWith(getFromAlbumOutput, controller.tracks, 100);
        expect(DataLoader.calls.count()).toBe(1);

        expect($scope.trackRequest).toBe(mockDataLoader);
        expect(mockDataLoader.fetch).toHaveBeenCalledWith();
        expect(mockDataLoader.fetch.calls.count()).toBe(1);
    });
});

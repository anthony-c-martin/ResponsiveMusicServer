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

    describe('initialisation', function() {
        it('should initialise artists, albums and tracks on start', function() {
            expect(controller.artists).toEqual([]);
            expect(controller.albums).toEqual([]);
            expect(controller.tracks).toEqual([]);
        });

        it('should set the artistRequest scope variable on start', function() {
            expect(ApiRequest.artist.getAll).toHaveBeenCalledWith();
            expect(ApiRequest.artist.getAll.calls.count()).toBe(1);

            expect(DataLoader).toHaveBeenCalledWith(artistGetAllOutput, controller.artists, 100);
            expect(DataLoader.calls.count()).toBe(1);

            expect($scope.artistRequest).toBe(mockDataLoader);
        });
    });

    describe('event: selectArtist', function() {
        it('should load albums by the given artist', function() {
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
    });

    describe('event: selectAlbum', function() {
        it('should load tracks for the given album', function() {
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

});

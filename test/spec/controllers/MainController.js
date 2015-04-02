'use strict';

describe('Controller: MainController', function() {

    var controller,
        DataLoaderFactory,
        playerService,
        ApiFactory,
        $rootScope,
        $scope,
        $q;

    var artistGetAllOutput = {};
    var mockDataLoaderFactory = {
        fetch: function() {},
    };

    beforeEach(function() {
        module('musicServerApp', function($provide) {
            $provide.value('DataLoaderFactory', jasmine.createSpy('DataLoaderFactorySpy').and.returnValue(mockDataLoaderFactory));
        });

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $scope = $rootScope.$new();
            DataLoaderFactory = $injector.get('DataLoaderFactory');
            playerService = $injector.get('playerService');
            ApiFactory = $injector.get('ApiFactory');
            var $controller = $injector.get('$controller');

            spyOn(ApiFactory.artist, 'getAll').and.returnValue(artistGetAllOutput);

            controller = $controller('MainController', {
                $rootScope: $rootScope,
                $scope: $scope,
                DataLoaderFactory: DataLoaderFactory,
                playerService: playerService,
                ApiFactory: ApiFactory
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
            expect(ApiFactory.artist.getAll).toHaveBeenCalledWith();
            expect(ApiFactory.artist.getAll.calls.count()).toBe(1);

            expect(DataLoaderFactory).toHaveBeenCalledWith(artistGetAllOutput, controller.artists, 100);
            expect(DataLoaderFactory.calls.count()).toBe(1);

            expect($scope.artistRequest).toBe(mockDataLoaderFactory);
        });
    });

    describe('event: selectArtist', function() {
        it('should load albums by the given artist', function() {
            DataLoaderFactory.calls.reset();
            var getFromArtistOutput = {};
            spyOn(ApiFactory.album, 'getFromArtist').and.returnValue(getFromArtistOutput);
            spyOn(mockDataLoaderFactory, 'fetch');
            var mockArtist = {
                ID: 12987
            };

            $scope.albumRequest = null;
            $rootScope.$emit('selectArtist', mockArtist);

            expect(ApiFactory.album.getFromArtist).toHaveBeenCalledWith(12987);
            expect(ApiFactory.album.getFromArtist.calls.count()).toBe(1);

            expect(DataLoaderFactory).toHaveBeenCalledWith(getFromArtistOutput, controller.albums, 100);
            expect(DataLoaderFactory.calls.count()).toBe(1);

            expect($scope.albumRequest).toBe(mockDataLoaderFactory);
            expect(mockDataLoaderFactory.fetch).toHaveBeenCalledWith();
            expect(mockDataLoaderFactory.fetch.calls.count()).toBe(1);

            expect($scope.trackRequest).toBeNull();
        });
    });

    describe('event: selectAlbum', function() {
        it('should load tracks for the given album', function() {
            DataLoaderFactory.calls.reset();
            var getFromAlbumOutput = {};
            spyOn(ApiFactory.track, 'getFromAlbum').and.returnValue(getFromAlbumOutput);
            spyOn(mockDataLoaderFactory, 'fetch');
            var mockAlbum = {
                ID: 125225
            };

            $scope.trackRequest = null;
            $rootScope.$emit('selectAlbum', mockAlbum);

            expect(ApiFactory.track.getFromAlbum).toHaveBeenCalledWith(125225);
            expect(ApiFactory.track.getFromAlbum.calls.count()).toBe(1);

            expect(DataLoaderFactory).toHaveBeenCalledWith(getFromAlbumOutput, controller.tracks, 100);
            expect(DataLoaderFactory.calls.count()).toBe(1);

            expect($scope.trackRequest).toBe(mockDataLoaderFactory);
            expect(mockDataLoaderFactory.fetch).toHaveBeenCalledWith();
            expect(mockDataLoaderFactory.fetch.calls.count()).toBe(1);
        });
    });

});

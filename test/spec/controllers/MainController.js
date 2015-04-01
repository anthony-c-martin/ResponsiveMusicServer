'use strict';

describe('Controller: MainController', function() {

    var controller,
        dataLoaderFactory,
        playerService,
        apiFactory,
        $rootScope,
        $scope,
        $q;

    var artistGetAllOutput = {};
    var mockdataLoaderFactory = {
        fetch: function() {},
    };

    beforeEach(function() {
        module('musicServerApp', function($provide) {
            $provide.value('dataLoaderFactory', jasmine.createSpy('dataLoaderFactorySpy').and.returnValue(mockdataLoaderFactory));
        });

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $scope = $rootScope.$new();
            dataLoaderFactory = $injector.get('dataLoaderFactory');
            playerService = $injector.get('playerService');
            apiFactory = $injector.get('apiFactory');
            var $controller = $injector.get('$controller');

            spyOn(apiFactory.artist, 'getAll').and.returnValue(artistGetAllOutput);

            controller = $controller('MainController', {
                $rootScope: $rootScope,
                $scope: $scope,
                dataLoaderFactory: dataLoaderFactory,
                playerService: playerService,
                apiFactory: apiFactory
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
            expect(apiFactory.artist.getAll).toHaveBeenCalledWith();
            expect(apiFactory.artist.getAll.calls.count()).toBe(1);

            expect(dataLoaderFactory).toHaveBeenCalledWith(artistGetAllOutput, controller.artists, 100);
            expect(dataLoaderFactory.calls.count()).toBe(1);

            expect($scope.artistRequest).toBe(mockdataLoaderFactory);
        });
    });

    describe('event: selectArtist', function() {
        it('should load albums by the given artist', function() {
            dataLoaderFactory.calls.reset();
            var getFromArtistOutput = {};
            spyOn(apiFactory.album, 'getFromArtist').and.returnValue(getFromArtistOutput);
            spyOn(mockdataLoaderFactory, 'fetch');
            var mockArtist = {
                ID: 12987
            };

            $scope.albumRequest = null;
            $rootScope.$emit('selectArtist', mockArtist);

            expect(apiFactory.album.getFromArtist).toHaveBeenCalledWith(12987);
            expect(apiFactory.album.getFromArtist.calls.count()).toBe(1);

            expect(dataLoaderFactory).toHaveBeenCalledWith(getFromArtistOutput, controller.albums, 100);
            expect(dataLoaderFactory.calls.count()).toBe(1);

            expect($scope.albumRequest).toBe(mockdataLoaderFactory);
            expect(mockdataLoaderFactory.fetch).toHaveBeenCalledWith();
            expect(mockdataLoaderFactory.fetch.calls.count()).toBe(1);

            expect($scope.trackRequest).toBeNull();
        });
    });

    describe('event: selectAlbum', function() {
        it('should load tracks for the given album', function() {
            dataLoaderFactory.calls.reset();
            var getFromAlbumOutput = {};
            spyOn(apiFactory.track, 'getFromAlbum').and.returnValue(getFromAlbumOutput);
            spyOn(mockdataLoaderFactory, 'fetch');
            var mockAlbum = {
                ID: 125225
            };

            $scope.trackRequest = null;
            $rootScope.$emit('selectAlbum', mockAlbum);

            expect(apiFactory.track.getFromAlbum).toHaveBeenCalledWith(125225);
            expect(apiFactory.track.getFromAlbum.calls.count()).toBe(1);

            expect(dataLoaderFactory).toHaveBeenCalledWith(getFromAlbumOutput, controller.tracks, 100);
            expect(dataLoaderFactory.calls.count()).toBe(1);

            expect($scope.trackRequest).toBe(mockdataLoaderFactory);
            expect(mockdataLoaderFactory.fetch).toHaveBeenCalledWith();
            expect(mockdataLoaderFactory.fetch.calls.count()).toBe(1);
        });
    });

});

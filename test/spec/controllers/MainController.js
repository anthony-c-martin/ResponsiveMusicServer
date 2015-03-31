'use strict';

describe('Controller: MainController', function() {

    var controller,
        dataLoaderService,
        playerService,
        apiService,
        $rootScope,
        $scope,
        $q;

    var artistGetAllOutput = {};
    var mockdataLoaderService = {
        fetch: function() {},
    };

    beforeEach(function() {
        module('musicServerApp', function($provide) {
            $provide.value('dataLoaderService', jasmine.createSpy('dataLoaderServiceSpy').and.returnValue(mockdataLoaderService));
        });

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $scope = $rootScope.$new();
            dataLoaderService = $injector.get('dataLoaderService');
            playerService = $injector.get('playerService');
            apiService = $injector.get('apiService');
            var $controller = $injector.get('$controller');

            spyOn(apiService.artist, 'getAll').and.returnValue(artistGetAllOutput);

            controller = $controller('MainController', {
                $rootScope: $rootScope,
                $scope: $scope,
                dataLoaderService: dataLoaderService,
                playerService: playerService,
                apiService: apiService
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
            expect(apiService.artist.getAll).toHaveBeenCalledWith();
            expect(apiService.artist.getAll.calls.count()).toBe(1);

            expect(dataLoaderService).toHaveBeenCalledWith(artistGetAllOutput, controller.artists, 100);
            expect(dataLoaderService.calls.count()).toBe(1);

            expect($scope.artistRequest).toBe(mockdataLoaderService);
        });
    });

    describe('event: selectArtist', function() {
        it('should load albums by the given artist', function() {
            dataLoaderService.calls.reset();
            var getFromArtistOutput = {};
            spyOn(apiService.album, 'getFromArtist').and.returnValue(getFromArtistOutput);
            spyOn(mockdataLoaderService, 'fetch');
            var mockArtist = {
                ID: 12987
            };

            $scope.albumRequest = null;
            $rootScope.$emit('selectArtist', mockArtist);

            expect(apiService.album.getFromArtist).toHaveBeenCalledWith(12987);
            expect(apiService.album.getFromArtist.calls.count()).toBe(1);

            expect(dataLoaderService).toHaveBeenCalledWith(getFromArtistOutput, controller.albums, 100);
            expect(dataLoaderService.calls.count()).toBe(1);

            expect($scope.albumRequest).toBe(mockdataLoaderService);
            expect(mockdataLoaderService.fetch).toHaveBeenCalledWith();
            expect(mockdataLoaderService.fetch.calls.count()).toBe(1);

            expect($scope.trackRequest).toBeNull();
        });
    });

    describe('event: selectAlbum', function() {
        it('should load tracks for the given album', function() {
            dataLoaderService.calls.reset();
            var getFromAlbumOutput = {};
            spyOn(apiService.track, 'getFromAlbum').and.returnValue(getFromAlbumOutput);
            spyOn(mockdataLoaderService, 'fetch');
            var mockAlbum = {
                ID: 125225
            };

            $scope.trackRequest = null;
            $rootScope.$emit('selectAlbum', mockAlbum);

            expect(apiService.track.getFromAlbum).toHaveBeenCalledWith(125225);
            expect(apiService.track.getFromAlbum.calls.count()).toBe(1);

            expect(dataLoaderService).toHaveBeenCalledWith(getFromAlbumOutput, controller.tracks, 100);
            expect(dataLoaderService.calls.count()).toBe(1);

            expect($scope.trackRequest).toBe(mockdataLoaderService);
            expect(mockdataLoaderService.fetch).toHaveBeenCalledWith();
            expect(mockdataLoaderService.fetch.calls.count()).toBe(1);
        });
    });

});

'use strict';

describe('Controller: AlbumController', function() {

    var controller,
        $scope,
        $rootScope,
        PlayerService,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            PlayerService = $injector.get('PlayerService');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('AlbumController', {
                $scope: $scope,
                PlayerService: PlayerService
            });
        });

        controller.album = {
            ID: 366
        };
    });

    describe('play', function() {
        it('should clear the playlist, call addTracksByAlbum on the playlist, and then select the next track', function() {
            spyOn(PlayerService.playlist, 'clear');
            spyOn(PlayerService.playlist, 'addTracksByAlbum').and.returnValue($q.when());
            spyOn(PlayerService.controlHooks, 'nextTrack');

            controller.play();

            expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
            expect(PlayerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(366);
            $scope.$digest();
            expect(PlayerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('add', function() {
        it('should call addTracksByAlbum on the playlist', function() {
            spyOn(PlayerService.playlist, 'addTracksByAlbum');

            controller.add();

            expect(PlayerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(366);
        });
    });

    describe('select', function() {
        it('should emit a selectAlbum event', function() {
            spyOn($scope, '$emit');
            var mockAlbum = {};
            controller.album = mockAlbum;

            controller.select();

            expect($scope.$emit).toHaveBeenCalledWith('selectAlbum', mockAlbum);
            expect($scope.$emit.calls.count()).toBe(1);
        });
    });
});

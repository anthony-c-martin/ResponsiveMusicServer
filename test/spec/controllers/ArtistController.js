'use strict';

describe('Controller: ArtistController', function() {

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

            controller = $controller('ArtistController', {
                $scope: $scope,
                PlayerService: PlayerService
            });
        });

        controller.artist = {
            ID: 457
        };
    });

    describe('play', function() {
        it('should clear the playlist, call addTracksByArtist on the playlist, and then select the next track', function() {
            spyOn(PlayerService.playlist, 'clear');
            spyOn(PlayerService.playlist, 'addTracksByArtist').and.returnValue($q.when());
            spyOn(PlayerService.controlHooks, 'nextTrack');

            controller.play();

            expect(PlayerService.playlist.clear).toHaveBeenCalledWith();
            expect(PlayerService.playlist.addTracksByArtist).toHaveBeenCalledWith(457);
            $scope.$digest();
            expect(PlayerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('add', function() {
        it('should call addTracksByArtist on the playlist', function() {
            spyOn(PlayerService.playlist, 'addTracksByArtist');

            controller.add();

            expect(PlayerService.playlist.addTracksByArtist).toHaveBeenCalledWith(457);
        });
    });

    describe('select', function() {
        it('should emit a selectArtist event', function() {
            spyOn($scope, '$emit');
            var mockArtist = {};
            controller.artist = mockArtist;

            controller.select();

            expect($scope.$emit).toHaveBeenCalledWith('selectArtist', mockArtist);
            expect($scope.$emit.calls.count()).toBe(1);
        });
    });
});

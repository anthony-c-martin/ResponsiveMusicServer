/* jshint -W117, -W030 */
describe('app.components.album.AlbumController', function() {

    beforeEach(module('app.components.album'));
    beforeEach(inject(function($controller, $rootScope, $state, $q, playerService) {
        window.$scope = $rootScope.$new();
        window.$rootScope = $rootScope;
        window.$state = $state;
        window.$q = $q;
        window.playerService = playerService;

        window.controller = $controller('AlbumController', {
            $scope: $scope,
            $state: $state,
            playerService: playerService
        });
        controller.album = {
            Name: 'Joe\'s Garage',
            ID: 366
        };
    }));

    describe('play', function() {
        it('should clear the playlist, call addTracksByAlbum on the playlist, and then select the next track', function() {
            spyOn(playerService.playlist, 'clear');
            spyOn(playerService.playlist, 'addTracksByAlbum').and.returnValue($q.when());
            spyOn(playerService.controlHooks, 'nextTrack');

            controller.play();

            expect(playerService.playlist.clear).toHaveBeenCalledWith();
            expect(playerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(366);
            $scope.$digest();
            expect(playerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('add', function() {
        it('should call addTracksByAlbum on the playlist', function() {
            spyOn(playerService.playlist, 'addTracksByAlbum');

            controller.add();

            expect(playerService.playlist.addTracksByAlbum).toHaveBeenCalledWith(366);
        });
    });
});

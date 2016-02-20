/* jshint -W117, -W030 */
describe('app.components.artist.ArtistController', function() {

    beforeEach(module('app.components.artist'));
    beforeEach(inject(function($controller, $rootScope, $state, $q, playerService) {
        window.$scope = $rootScope.$new();
        window.$rootScope = $rootScope;
        window.$state = $state;
        window.$q = $q;
        window.playerService = playerService;

        window.controller = $controller('ArtistController', {
            $scope: $scope,
            $state: $state,
            playerService: playerService
        });
        controller.artist = {
            Name: 'The Mothers of Invention',
            ID: 457
        };
    }));

    describe('play', function() {
        it('should clear the playlist, call addTracksByArtist on the playlist, and then select the next track', function() {
            spyOn(playerService.playlist, 'clear');
            spyOn(playerService.playlist, 'addTracksByArtist').and.returnValue($q.when());
            spyOn(playerService.controlHooks, 'nextTrack');

            controller.play();

            expect(playerService.playlist.clear).toHaveBeenCalledWith();
            expect(playerService.playlist.addTracksByArtist).toHaveBeenCalledWith(457);
            $scope.$digest();
            expect(playerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('add', function() {
        it('should call addTracksByArtist on the playlist', function() {
            spyOn(playerService.playlist, 'addTracksByArtist');

            controller.add();

            expect(playerService.playlist.addTracksByArtist).toHaveBeenCalledWith(457);
        });
    });
});

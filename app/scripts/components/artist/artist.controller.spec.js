/* jshint -W117, -W030 */
describe('app.components.artist.ArtistController', function() {

    var controller,
        $scope,
        $rootScope,
        playerService,
        $q;

    beforeEach(function() {
        module('app.components.artist');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            playerService = $injector.get('playerService');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('ArtistController', {
                $scope: $scope,
                playerService: playerService
            });
        });

        controller.artist = {
            ID: 457
        };
    });

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

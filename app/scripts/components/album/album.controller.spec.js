/* jshint -W117, -W030 */
describe('app.components.album.AlbumController', function() {

    var controller,
        $scope,
        $rootScope,
        playerService,
        $q;

    beforeEach(function() {
        module('app.components.album');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            playerService = $injector.get('playerService');
            $scope = $rootScope.$new();
            var $controller = $injector.get('$controller');

            controller = $controller('AlbumController', {
                $scope: $scope,
                playerService: playerService
            });
        });

        controller.album = {
            ID: 366
        };
    });

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

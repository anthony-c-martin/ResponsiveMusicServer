'use strict';

describe('AudioController', function() {

    var controller,
        PlayerService,
        $rootScope;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            PlayerService = jasmine.createSpyObj('PlayerService', [
                'togglePause', 'nextTrack', 'previousTrack', 'volumeUpdate', 'positionUpdate'
            ]);
            var $controller = $injector.get('$controller');

            controller = $controller('AudioController', {
                PlayerService: PlayerService,
                $rootScope: $rootScope
            });
        });
    });

    describe('togglePause', function() {
        it('should call togglePause on the PlayerService', function() {
            controller.togglePause();

            expect(PlayerService.togglePause).toHaveBeenCalledWith();
        });
    });

    describe('nextTrack', function() {
        it('should call nextTrack on the PlayerService', function() {
            controller.nextTrack();

            expect(PlayerService.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('previousTrack', function() {
        it('should call previousTrack on the PlayerService', function() {
            controller.previousTrack();

            expect(PlayerService.previousTrack).toHaveBeenCalledWith();
        });
    });

    describe('volumeUpdate', function() {
        it('should call volumeUpdate on the PlayerService', function() {
            controller.volumeUpdate(0.8);

            expect(PlayerService.volumeUpdate).toHaveBeenCalledWith(0.8);
        });
    });

    describe('positionUpdate', function() {
        it('should call positionUpdate on the PlayerService', function() {
            controller.positionUpdate();

            expect(PlayerService.positionUpdate).toHaveBeenCalledWith(0.7);
        });
    });
});

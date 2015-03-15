'use strict';

describe('Controller: AudioController', function() {

    var controller,
        PlayerService,
        $rootScope;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            PlayerService = $injector.get('PlayerService');
            var $controller = $injector.get('$controller');

            controller = $controller('AudioController', {
                PlayerService: PlayerService,
                $rootScope: $rootScope
            });
        });
    });

    describe('togglePause', function() {
        it('should call togglePause on the PlayerService', function() {
            spyOn(PlayerService.controlHooks, 'togglePause');

            controller.togglePause();

            expect(PlayerService.controlHooks.togglePause).toHaveBeenCalledWith();
        });
    });

    describe('nextTrack', function() {
        it('should call nextTrack on the PlayerService', function() {
            spyOn(PlayerService.controlHooks, 'nextTrack');

            controller.nextTrack();

            expect(PlayerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('previousTrack', function() {
        it('should call previousTrack on the PlayerService', function() {
            spyOn(PlayerService.controlHooks, 'previousTrack');

            controller.previousTrack();

            expect(PlayerService.controlHooks.previousTrack).toHaveBeenCalledWith();
        });
    });

    describe('volumeUpdate', function() {
        it('should call volumeUpdate on the PlayerService', function() {
            spyOn(PlayerService.controlHooks, 'volumeUpdate');

            controller.volumeUpdate(0.8);

            expect(PlayerService.controlHooks.volumeUpdate).toHaveBeenCalledWith(0.8);
        });
    });

    describe('positionUpdate', function() {
        it('should call positionUpdate on the PlayerService', function() {
            spyOn(PlayerService.controlHooks, 'positionUpdate');

            controller.positionUpdate(0.7);

            expect(PlayerService.controlHooks.positionUpdate).toHaveBeenCalledWith(0.7);
        });
    });
});

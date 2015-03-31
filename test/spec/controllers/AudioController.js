'use strict';

describe('Controller: AudioController', function() {

    var controller,
        playerService,
        $rootScope;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            playerService = $injector.get('playerService');
            var $controller = $injector.get('$controller');

            controller = $controller('AudioController', {
                playerService: playerService,
                $rootScope: $rootScope
            });
        });
    });

    describe('togglePause', function() {
        it('should call togglePause on the playerService', function() {
            spyOn(playerService.controlHooks, 'togglePause');

            controller.togglePause();

            expect(playerService.controlHooks.togglePause).toHaveBeenCalledWith();
        });
    });

    describe('nextTrack', function() {
        it('should call nextTrack on the playerService', function() {
            spyOn(playerService.controlHooks, 'nextTrack');

            controller.nextTrack();

            expect(playerService.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

    describe('previousTrack', function() {
        it('should call previousTrack on the playerService', function() {
            spyOn(playerService.controlHooks, 'previousTrack');

            controller.previousTrack();

            expect(playerService.controlHooks.previousTrack).toHaveBeenCalledWith();
        });
    });

    describe('volumeUpdate', function() {
        it('should call volumeUpdate on the playerService', function() {
            spyOn(playerService.controlHooks, 'volumeUpdate');

            controller.volumeUpdate(0.8);

            expect(playerService.controlHooks.volumeUpdate).toHaveBeenCalledWith(0.8);
        });
    });

    describe('positionUpdate', function() {
        it('should call positionUpdate on the playerService', function() {
            spyOn(playerService.controlHooks, 'positionUpdate');

            controller.positionUpdate(0.7);

            expect(playerService.controlHooks.positionUpdate).toHaveBeenCalledWith(0.7);
        });
    });
});

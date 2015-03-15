'use strict';

describe('Directive: audioSource', function() {

    var element,
        PlayerService,
        scope,
        $rootScope,
        $parentScope,
        $compile;

    beforeEach(function() {
        module('musicServerApp');
        module('musicServerApp.views');

        inject(function($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $parentScope = $rootScope.$new();
            PlayerService = $injector.get('PlayerService');

            element = angular.element(
                '<audio audio-source></audio>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();

            spyOn(scope, '$apply').and.callThrough();
        });
    });

    describe('play event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.play', function() {
            spyOn(PlayerService.audioHooks, 'play');

            element.trigger('play');

            expect(PlayerService.audioHooks.play).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('pause event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.pause', function() {
            spyOn(PlayerService.audioHooks, 'pause');

            element.trigger('pause');

            expect(PlayerService.audioHooks.pause).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('volumechange event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.volumeChange', function() {
            spyOn(PlayerService.audioHooks, 'volumeChange');

            element[0].volume = 0.94;
            element.trigger('volumechange');

            expect(PlayerService.audioHooks.volumeChange).toHaveBeenCalledWith(0.94);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('timeupdate event', function() {
        it('should call PlayerService.audioHooks.positionChange with the position set to 0 if there is no audio duration', function() {
            spyOn(PlayerService.audioHooks, 'positionChange');

            element.trigger('timeupdate');

            expect(PlayerService.audioHooks.positionChange).toHaveBeenCalledWith(0);
            expect(scope.$apply).toHaveBeenCalled();
        });

        it('should call PlayerService.audioHooks.positionChange with the position set to currentTime divided by duration', function() {
            spyOn(PlayerService.audioHooks, 'positionChange');

            element[0].duration = 10;
            element[0].currentTime = 4;
            element.trigger('timeupdate');

            expect(PlayerService.audioHooks.positionChange).toHaveBeenCalledWith(0.4);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('ended event', function() {
        it('should call PlayerService.audioHooks.ended', function() {
            spyOn(PlayerService.audioHooks, 'ended');

            element.trigger('ended');

            expect(PlayerService.audioHooks.ended).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    })
});

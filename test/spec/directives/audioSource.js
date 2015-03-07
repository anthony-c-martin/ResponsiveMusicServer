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
        it('should call scope.$apply and set PlayerService.current.isPlaying to true', function() {
            PlayerService.current.isPlaying = false;

            element.trigger('play');

            expect(PlayerService.current.isPlaying).toBe(true);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('pause event', function() {
        it('should call scope.$apply and set PlayerService.current.isPlaying to false', function() {
            PlayerService.current.isPlaying = true;

            element.trigger('pause');

            expect(PlayerService.current.isPlaying).toBe(false);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('volumechange event', function() {
        it('should call scope.$apply and set PlayerService.current.volume', function() {
            PlayerService.current.volume = 0.23;

            element[0].volume = 0.94;
            element.trigger('volumechange');

            expect(PlayerService.current.volume).toBe(0.94);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('timeupdate event', function() {
        it('should call PlayerService.setPosition with the position set to 0 if there is no audio duration', function() {
            PlayerService.current.position = 0.23;

            element.trigger('timeupdate');

            expect(PlayerService.current.position).toBe(0);
            expect(scope.$apply).toHaveBeenCalled();
        });

        it('should call PlayerService.setPosition with the position set to currentTime divided by duration', function() {
            PlayerService.current.position = 0.23;

            element[0].duration = 10;
            element[0].currentTime = 4;
            element.trigger('timeupdate');

            expect(PlayerService.current.position).toBe(0.4);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('ended event', function() {
        it('should call PlayerService.nextTrack', function() {
            spyOn(PlayerService, 'nextTrack');

            element.trigger('ended');

            expect(PlayerService.nextTrack).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    })
});

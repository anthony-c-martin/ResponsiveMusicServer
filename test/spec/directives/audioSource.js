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
                '<audio-source></audio-source>'
            );

            $compile(element)($parentScope);
            $parentScope.$digest();

            scope = element.scope();
        });
    });

    describe('play event', function() {
        it('should call PlayerService.setPlaying with playing set to true', function() {
            spyOn(PlayerService, 'setPlaying');
            spyOn(scope, '$apply').and.callThrough();

            element.trigger('play');

            expect(PlayerService.setPlaying).toHaveBeenCalledWith(true);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('pause event', function() {
        it('should call PlayerService.setPlaying with playing set to false', function() {
            spyOn(PlayerService, 'setPlaying');
            spyOn(scope, '$apply').and.callThrough();

            element.trigger('pause');

            expect(PlayerService.setPlaying).toHaveBeenCalledWith(false);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('volumechange event', function() {
        it('should call PlayerService.setVolume with the volume level', function() {
            spyOn(PlayerService, 'setVolume');
            spyOn(scope, '$apply').and.callThrough();

            element[0].volume = 0.94;
            element.trigger('volumechange');

            expect(PlayerService.setVolume).toHaveBeenCalledWith(0.94);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('timeupdate event', function() {
        it('should call PlayerService.setPosition with the position set to 0 if there is no audio duration', function() {
            spyOn(PlayerService, 'setPosition');
            spyOn(scope, '$apply').and.callThrough();

            element.trigger('timeupdate');

            expect(PlayerService.setPosition).toHaveBeenCalledWith(0);
            expect(scope.$apply).toHaveBeenCalled();
        });

        it('should call PlayerService.setPosition with the position set to currentTime divided by duration', function() {
            spyOn(PlayerService, 'setPosition');
            spyOn(scope, '$apply').and.callThrough();

            element[0].duration = 10;
            element[0].currentTime = 4;
            element.trigger('timeupdate');

            expect(PlayerService.setPosition).toHaveBeenCalledWith(0.4);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('ended event', function() {
        it('should call PlayerService.nextTrack', function() {
            spyOn(PlayerService, 'nextTrack');
            spyOn(scope, '$apply').and.callThrough();

            element.trigger('ended');

            expect(PlayerService.nextTrack).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    })
});

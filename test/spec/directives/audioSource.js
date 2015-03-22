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

    describe('audio.play event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.play', function() {
            spyOn(PlayerService.audioHooks, 'play');

            element.trigger('play');

            expect(PlayerService.audioHooks.play).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.pause event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.pause', function() {
            spyOn(PlayerService.audioHooks, 'pause');

            element.trigger('pause');

            expect(PlayerService.audioHooks.pause).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.volumechange event', function() {
        it('should call scope.$apply and call PlayerService.audioHooks.volumeChange', function() {
            spyOn(PlayerService.audioHooks, 'volumeChange');

            element[0].volume = 0.94;
            element.trigger('volumechange');

            expect(PlayerService.audioHooks.volumeChange).toHaveBeenCalledWith(0.94);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.timeupdate event', function() {
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

    describe('audio.ended event', function() {
        it('should call PlayerService.audioHooks.ended', function() {
            spyOn(PlayerService.audioHooks, 'ended');

            element.trigger('ended');

            expect(PlayerService.audioHooks.ended).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('PlayerService.volumeUpdate event', function() {
        it('should update the element volume property', function() {
            $rootScope.$emit('PlayerService.volumeUpdate', 0.76);

            expect(element[0].volume).toBe(0.76);
        });
    });

    describe('PlayerService.positionUpdate event', function() {
        it('should update the element currentTime property', function() {
            element[0].readyState = true;
            element[0].duration = 60;
            element[0].currentTime = 0;
            $rootScope.$emit('PlayerService.positionUpdate', 0.75);

            expect(element[0].currentTime).toBe(45);
        });

        it('should only update the element currentTime property if readyState is true', function() {
            element[0].readyState = false;
            element[0].duration = 60;
            element[0].currentTime = 0;
            $rootScope.$emit('PlayerService.positionUpdate', 0.75);

            expect(element[0].currentTime).toBe(0);
        });
    });

    describe('PlayerService.play event', function() {
        it('should call play on the element', function() {
            element[0].play = jasmine.createSpy('play');

            $rootScope.$emit('PlayerService.play');

            expect(element[0].play).toHaveBeenCalledWith();
        });
    });

    describe('PlayerService.pause event', function() {
        it('should call play on the element', function() {
            element[0].pause = jasmine.createSpy('pause');

            $rootScope.$emit('PlayerService.pause');

            expect(element[0].pause).toHaveBeenCalledWith();
        });
    });

    describe('PlayerService.playNew event', function() {
        beforeEach(function() {
            element[0].pause = jasmine.createSpy('pause');
            element[0].play = jasmine.createSpy('pause');
            element[0].src = '';
            element[0].type = '';
        });

        it('should call pause on the element and replace the src and type properties', function() {
            $rootScope.$emit('PlayerService.playNew', {src: '124', type: 'dsg'});

            expect(element[0].pause).toHaveBeenCalledWith();
            expect(element[0].src).toBe('124');
            expect(element[0].type).toBe('dsg');
        });

        it('should call pause on the element and replace the src and type properties even if they are empty', function() {
            element[0].src = 'asdgsda';
            element[0].type = 'asdhdsah';
            $rootScope.$emit('PlayerService.playNew', {src: '', type: ''});

            expect(element[0].pause).toHaveBeenCalledWith();
            expect(element[0].src).toBe('');
            expect(element[0].type).toBe('');
        });

        it('should call play if the src property is set', function() {
            $rootScope.$emit('PlayerService.playNew', {src: '124', type: 'dsg'});

            expect(element[0].play).toHaveBeenCalledWith();
        });

        it('should not call play if the src property is not set, and should call pause and positionChange on the PlayerService.audioHooks object', function() {
            spyOn(PlayerService.audioHooks, 'pause');
            spyOn(PlayerService.audioHooks, 'positionChange');
            $rootScope.$emit('PlayerService.playNew', {src: '', type: ''});

            expect(PlayerService.audioHooks.pause).toHaveBeenCalledWith();
            expect(PlayerService.audioHooks.positionChange).toHaveBeenCalledWith(0);
            expect(element[0].play).not.toHaveBeenCalledWith();
        });
    });
});

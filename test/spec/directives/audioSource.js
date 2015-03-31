'use strict';

describe('Directive: audioSource', function() {

    var element,
        playerService,
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
            playerService = $injector.get('playerService');

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
        it('should call scope.$apply and call playerService.audioHooks.play', function() {
            spyOn(playerService.audioHooks, 'play');

            element.trigger('play');

            expect(playerService.audioHooks.play).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.pause event', function() {
        it('should call scope.$apply and call playerService.audioHooks.pause', function() {
            spyOn(playerService.audioHooks, 'pause');

            element.trigger('pause');

            expect(playerService.audioHooks.pause).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.volumechange event', function() {
        it('should call scope.$apply and call playerService.audioHooks.volumeChange', function() {
            spyOn(playerService.audioHooks, 'volumeChange');

            element[0].volume = 0.94;
            element.trigger('volumechange');

            expect(playerService.audioHooks.volumeChange).toHaveBeenCalledWith(0.94);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.timeupdate event', function() {
        it('should call playerService.audioHooks.positionChange with the position set to 0 if there is no audio duration', function() {
            spyOn(playerService.audioHooks, 'positionChange');

            element.trigger('timeupdate');

            expect(playerService.audioHooks.positionChange).toHaveBeenCalledWith(0);
            expect(scope.$apply).toHaveBeenCalled();
        });

        it('should call playerService.audioHooks.positionChange with the position set to currentTime divided by duration', function() {
            spyOn(playerService.audioHooks, 'positionChange');

            element[0].duration = 10;
            element[0].currentTime = 4;
            element.trigger('timeupdate');

            expect(playerService.audioHooks.positionChange).toHaveBeenCalledWith(0.4);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('audio.ended event', function() {
        it('should call playerService.audioHooks.ended', function() {
            spyOn(playerService.audioHooks, 'ended');

            element.trigger('ended');

            expect(playerService.audioHooks.ended).toHaveBeenCalledWith();
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

    describe('playerService.volumeUpdate event', function() {
        it('should update the element volume property', function() {
            $rootScope.$emit('playerService.volumeUpdate', 0.76);

            expect(element[0].volume).toBe(0.76);
        });
    });

    describe('playerService.positionUpdate event', function() {
        it('should update the element currentTime property', function() {
            element[0].readyState = true;
            element[0].duration = 60;
            element[0].currentTime = 0;
            $rootScope.$emit('playerService.positionUpdate', 0.75);

            expect(element[0].currentTime).toBe(45);
        });

        it('should only update the element currentTime property if readyState is true', function() {
            element[0].readyState = false;
            element[0].duration = 60;
            element[0].currentTime = 0;
            $rootScope.$emit('playerService.positionUpdate', 0.75);

            expect(element[0].currentTime).toBe(0);
        });
    });

    describe('playerService.play event', function() {
        it('should call play on the element', function() {
            element[0].play = jasmine.createSpy('play');

            $rootScope.$emit('playerService.play');

            expect(element[0].play).toHaveBeenCalledWith();
        });
    });

    describe('playerService.pause event', function() {
        it('should call play on the element', function() {
            element[0].pause = jasmine.createSpy('pause');

            $rootScope.$emit('playerService.pause');

            expect(element[0].pause).toHaveBeenCalledWith();
        });
    });

    describe('playerService.playNew event', function() {
        beforeEach(function() {
            element[0].pause = jasmine.createSpy('pause');
            element[0].play = jasmine.createSpy('pause');
            element[0].src = '';
            element[0].type = '';
        });

        it('should call pause on the element and replace the src and type properties', function() {
            $rootScope.$emit('playerService.playNew', {src: '124', type: 'dsg'});

            expect(element[0].pause).toHaveBeenCalledWith();
            expect(element[0].src).toBe('124');
            expect(element[0].type).toBe('dsg');
        });

        it('should call pause on the element and replace the src and type properties even if they are empty', function() {
            element[0].src = 'asdgsda';
            element[0].type = 'asdhdsah';
            $rootScope.$emit('playerService.playNew', {src: '', type: ''});

            expect(element[0].pause).toHaveBeenCalledWith();
            expect(element[0].src).toBe('');
            expect(element[0].type).toBe('');
        });

        it('should call play if the src property is set', function() {
            $rootScope.$emit('playerService.playNew', {src: '124', type: 'dsg'});

            expect(element[0].play).toHaveBeenCalledWith();
        });

        it('should not call play if the src property is not set, and should call pause and positionChange on the playerService.audioHooks object', function() {
            spyOn(playerService.audioHooks, 'pause');
            spyOn(playerService.audioHooks, 'positionChange');
            $rootScope.$emit('playerService.playNew', {src: '', type: ''});

            expect(playerService.audioHooks.pause).toHaveBeenCalledWith();
            expect(playerService.audioHooks.positionChange).toHaveBeenCalledWith(0);
            expect(element[0].play).not.toHaveBeenCalledWith();
        });
    });
});

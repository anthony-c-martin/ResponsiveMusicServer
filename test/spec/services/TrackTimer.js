'use strict';

describe('Factory: TrackTimer', function() {

    var service;
    var currentTimer = {
        active: false
    };
    var currentTimerTick;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            var Factory = $injector.get('TrackTimer', {});

            service = new Factory();
        });

        spyOn(window, 'setInterval').andCallFake(function(timerTick) {
            currentTimerTick = timerTick;
            currentTimer.active = true;
            return currentTimer;
        });
        spyOn(window, 'clearInterval').andCallFake(function(timer) {
            currentTimerTick = undefined;
            if (timer) {
                timer.active = false;
            }
        });
    });

    describe('reset', function() {
        it('should start a new timer', function() {
            service.reset(function() {}, 10);

            expect(window.setInterval).toHaveBeenCalledWith(currentTimerTick, 1000);
            expect(currentTimer.active).toBeTruthy();
        });

        it('should call clearInterval on the current timer and start a new timer', function() {
            service.reset(function() {}, 1248);
            window.setInterval.reset();
            window.clearInterval.reset();

            service.reset(function() {}, 4278);
            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);

            expect(window.setInterval).toHaveBeenCalledWith(currentTimerTick, 1000);
            expect(currentTimer.active).toBeTruthy();
        });
    });

    describe('timerTick', function() {
        it('should increment the counter and fire a callback when the initial duration has been exceeded', function() {
            var callbackTest = jasmine.createSpy('callbackTest');
            service.reset(callbackTest, 5);
            window.setInterval.reset();
            window.clearInterval.reset();

            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            expect(callbackTest).not.toHaveBeenCalled();
            currentTimerTick();
            expect(callbackTest).toHaveBeenCalledWith();
            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
        });

        it('should reset the after the initial duration has been exceeded, and work again after reset has been called', function() {
            var callbackTest = jasmine.createSpy('callbackTest');
            service.reset(callbackTest, 1);
            window.setInterval.reset();
            window.clearInterval.reset();

            currentTimerTick();
            expect(callbackTest).toHaveBeenCalledWith();
            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
            callbackTest.reset();

            service.reset(callbackTest, 3);
            currentTimerTick();
            currentTimerTick();
            expect(callbackTest).not.toHaveBeenCalled();
            currentTimerTick();
            expect(callbackTest).toHaveBeenCalledWith();
            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
        });
    });

    describe('cancel', function() {
        it('should cancel the timer', function() {
            service.reset(function () {}, 123);
            window.setInterval.reset();
            window.clearInterval.reset();

            service.cancel();

            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
        });
    });

    describe('pause', function() {
        it('should pause the timer', function() {
            var callbackTest = jasmine.createSpy('callbackTest');
            service.reset(callbackTest, 5);
            window.setInterval.reset();
            window.clearInterval.reset();

            currentTimerTick();
            service.pause();
            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            expect(callbackTest).not.toHaveBeenCalled();
        });
    });

    describe('resume', function() {
        it('should resume the timer', function() {
            var callbackTest = jasmine.createSpy('callbackTest');
            service.reset(callbackTest, 5);
            window.setInterval.reset();
            window.clearInterval.reset();

            currentTimerTick();
            service.pause();
            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            service.resume();
            currentTimerTick();
            currentTimerTick();
            currentTimerTick();
            expect(callbackTest).not.toHaveBeenCalled();
            currentTimerTick();
            expect(callbackTest).toHaveBeenCalledWith();
        });
    });
});

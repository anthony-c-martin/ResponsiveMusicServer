/* jshint -W117, -W030 */
describe('app.services.player.trackTimerFactory', function() {

    var service;
    var currentTimer = {
        active: false
    };
    var currentTimerTick;

    beforeEach(function() {
        module('app.services.player');

        inject(function($injector) {
            var Factory = $injector.get('trackTimerFactory', {});

            service = new Factory();
        });

        spyOn(window, 'setInterval').and.callFake(function(timerTick) {
            currentTimerTick = timerTick;
            currentTimer.active = true;
            return currentTimer;
        });
        spyOn(window, 'clearInterval').and.callFake(function(timer) {
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
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

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
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

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
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

            currentTimerTick();
            expect(callbackTest).toHaveBeenCalledWith();
            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
            callbackTest.calls.reset();

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
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

            service.cancel();

            expect(window.clearInterval).toHaveBeenCalledWith(currentTimer);
        });
    });

    describe('pause', function() {
        it('should pause the timer', function() {
            var callbackTest = jasmine.createSpy('callbackTest');
            service.reset(callbackTest, 5);
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

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
            window.setInterval.calls.reset();
            window.clearInterval.calls.reset();

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

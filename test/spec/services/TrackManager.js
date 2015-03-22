'use strict';

describe('Service: TrackManager', function() {

    var service,
        $rootScope,
        $q,
        SessionData,
        TrackTimer,
        mockTrackTimer,
        ApiRequest;

    beforeEach(function() {
        mockTrackTimer = jasmine.createSpyObj('TrackTimer', ['reset', 'cancel', 'pause', 'resume']);
        module('musicServerApp', function($provide) {
            $provide.value('TrackTimer', jasmine.createSpy('TrackTimer').and.returnValue(mockTrackTimer));
        });

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            SessionData = $injector.get('SessionData');
            TrackTimer = $injector.get('TrackTimer');
            ApiRequest = $injector.get('ApiRequest');

            service = $injector.get('TrackManager', {
                SessionData: SessionData,
                TrackTimer: TrackTimer,
                ApiRequest: ApiRequest
            });
        });
    });

    describe('setupScrobbling', function() {
        it('should call scrobbleTimer.cancel if the ScrobblingEnabled setting is false', function() {
            spyOn(SessionData, 'getUserPreference').and.returnValue(false);

            service.setupScrobbling({});

            expect(mockTrackTimer.cancel).toHaveBeenCalledWith();
        });

        it('should submit an API nowplaying request', function() {
            spyOn(SessionData, 'getUserPreference').and.returnValue(true);
            spyOn(ApiRequest.track, 'lastFMNowPlaying').and.returnValue(jasmine.createSpyObj('request', ['submit']));

            service.setupScrobbling({ID: 2155});

            expect(ApiRequest.track.lastFMNowPlaying).toHaveBeenCalledWith(2155);
            expect(ApiRequest.track.lastFMNowPlaying().submit).toHaveBeenCalledWith();
        });

        it('should call scrobbleTimer.reset with half the time of the track as the second argument', function() {
            spyOn(SessionData, 'getUserPreference').and.returnValue(true);

            service.setupScrobbling({ID: 2155, Duration: 100});

            expect(mockTrackTimer.reset.calls.argsFor(0)[1]).toBe(50);
        });

        it('should call scrobbleTimer.reset with a callback function', function() {
            spyOn(SessionData, 'getUserPreference').and.returnValue(true);
            spyOn(ApiRequest.track, 'lastFMScrobble').and.returnValue(jasmine.createSpyObj('request', ['submit']));

            service.setupScrobbling({ID: 345745, Duration: 3215});
            var callbackFunction = mockTrackTimer.reset.calls.argsFor(0)[0];

            expect(ApiRequest.track.lastFMScrobble).not.toHaveBeenCalled();
            expect(mockTrackTimer.reset.calls.argsFor(0)[1]).toBe(240);
            callbackFunction();
            expect(ApiRequest.track.lastFMScrobble).toHaveBeenCalledWith(345745);
            expect(ApiRequest.track.lastFMScrobble().submit).toHaveBeenCalledWith();
        });
    });

    describe('togglePauseScrobbling', function() {
        it('should pause the scrobbleTimer when called with true', function() {
            service.togglePauseScrobbling(true);

            expect(mockTrackTimer.pause).toHaveBeenCalledWith();
        });

        it('should resume the scrobbleTimer when called with false', function() {
            service.togglePauseScrobbling(false);

            expect(mockTrackTimer.resume).toHaveBeenCalledWith();
        });
    });

    describe('startConversion', function() {
        var onErr;
        var onSuccess;
        var convertSpies;
        beforeEach(function() {
            onErr = jasmine.createSpy('onErr');
            onSuccess = jasmine.createSpy('onSuccess');
            convertSpies = [];
            spyOn(ApiRequest.track, 'convert').and.callFake(function(id) {
                convertSpies[id] = $q.defer();
                return {
                    submit: jasmine.createSpy('submit').and.returnValue(convertSpies[id].promise)
                };
            });
        });

        it('should return a rejected promise if no track is specified', function() {
            service.startConversion(null).then(onSuccess, onErr);
            $rootScope.$digest();

            expect(onErr).toHaveBeenCalledWith(undefined);
        });

        it('should return the track conversionPromise if it exists', function() {
            var track = {
                conversionPromise: {}
            };
            var returnVal = service.startConversion(track);

            expect(returnVal).toBe(track.conversionPromise);
        });

        it('should reject the previous conversion attempt if it exists', function() {
            service.startConversion({ID: 1}).then(onSuccess, onErr);
            service.startConversion({ID: 2});
            $rootScope.$digest();

            expect(ApiRequest.track.convert).toHaveBeenCalledWith(1);
            expect(ApiRequest.track.convert).toHaveBeenCalledWith(2);
            expect(onErr).toHaveBeenCalledWith(undefined);
        });

        it('should resolve the promise if the track already has a FileName property', function() {
            service.startConversion({ID: 1, FileName: 'asdgu'}).then(onSuccess, onErr);
            $rootScope.$digest();

            expect(ApiRequest.track.convert).not.toHaveBeenCalled();
            expect(onSuccess).toHaveBeenCalledWith({ID: 1, FileName: 'asdgu'});
        });

        it('should call ApiRequest.track.convert for the track, and set the conversionPromise property on the track', function() {
            var track = {ID: 125};
            var retVal = service.startConversion(track);
            retVal.then(onSuccess, onErr);
            $rootScope.$digest();

            expect(ApiRequest.track.convert).toHaveBeenCalledWith(125);
            expect(track.conversionPromise).toBeDefined();
            expect(retVal).toBe(track.conversionPromise);
            expect(onSuccess).not.toHaveBeenCalled();
            expect(onErr).not.toHaveBeenCalled();
        });

        it('should set the track filename and remove the conversionPromise property if the conversion succeeds', function() {
            var track = {ID: 125};
            var retVal = service.startConversion(track);
            retVal.then(onSuccess, onErr);
            convertSpies[125].resolve({Result: 'Success', FileName: 'gfasud'});
            $rootScope.$digest();

            expect(ApiRequest.track.convert).toHaveBeenCalledWith(125);
            expect(track.conversionPromise).not.toBeDefined();
            expect(onSuccess).toHaveBeenCalledWith(track);
            expect(onErr).not.toHaveBeenCalled();
            expect(track.FileName).toBe('gfasud');
        });

        it('should not set the track filename and remove the conversionPromise property if the conversion fails', function() {
            var track = {ID: 125};
            var retVal = service.startConversion(track);
            retVal.then(onSuccess, onErr);
            convertSpies[125].resolve({Result: 'Failure', FileName: 'gfasud'});
            $rootScope.$digest();

            expect(ApiRequest.track.convert).toHaveBeenCalledWith(125);
            expect(track.conversionPromise).not.toBeDefined();
            expect(onSuccess).not.toHaveBeenCalled();
            expect(onErr).toHaveBeenCalledWith(undefined);
            expect(track.FileName).not.toBeDefined();
        });

        it('should not set the track filename and remove the conversionPromise property if the conversion fails with an http error', function() {
            spyOn(console, 'warn');
            var track = {ID: 125};
            var retVal = service.startConversion(track);
            retVal.then(onSuccess, onErr);
            convertSpies[125].reject('asdgi8nasdg');
            $rootScope.$digest();

            expect(ApiRequest.track.convert).toHaveBeenCalledWith(125);
            expect(track.conversionPromise).not.toBeDefined();
            expect(onSuccess).not.toHaveBeenCalled();
            expect(onErr).toHaveBeenCalledWith(undefined);
            expect(track.FileName).not.toBeDefined();
            expect(console.warn).toHaveBeenCalledWith('asdgi8nasdg');
        });
    });

});

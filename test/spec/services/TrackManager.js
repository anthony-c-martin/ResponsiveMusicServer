'use strict';

describe('Service: TrackManager', function() {

    var service,
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

});

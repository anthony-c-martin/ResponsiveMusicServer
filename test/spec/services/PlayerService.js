'use strict';

describe('Service: PlayerService', function() {

    var service,
        $rootScope,
        PlaylistFactory,
        SessionData,
        TrackManager;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            PlaylistFactory = $injector.get('PlaylistFactory');
            SessionData = $injector.get('SessionData');
            TrackManager = $injector.get('TrackManager');

            service = $injector.get('PlayerService', {
                $rootScope: $rootScope,
                PlaylistFactory: PlaylistFactory,
                SessionData: SessionData,
                TrackManager: TrackManager
            });
        });
    });

    describe('initialisation', function() {
        it('should initialise player variables', function() {
            expect(service.current.track).toBeNull();
            expect(service.current.isPlaying).toBeFalsy();
            expect(service.current.volume).toBe(0.5);
            expect(service.current.position).toBe(0);
        });
    });

    describe('nextTrack', function() {
        beforeEach(function() {
            spyOn(TrackManager, 'setupScrobbling');
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf97ug'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$broadcast');
            service.nextTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf97ug'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf97ug&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdf97ug'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1},
                {ID: 2, FileName: 'asasdf8h'},
                {ID: 3, FileName: 3}
            ]);

            service.nextTrack();
            spyOn($rootScope, '$broadcast');
            TrackManager.setupScrobbling.calls.reset();
            service.nextTrack();

            expect(service.current.track).toEqual({ID: 2, FileName: 'asasdf8h'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asasdf8h&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 2, FileName: 'asasdf8h'});
        });

        it('should set the track to null if there is no next track', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1}
            ]);

            service.nextTrack();
            spyOn($rootScope, '$broadcast');
            TrackManager.setupScrobbling.calls.reset();
            service.nextTrack();

            expect(service.current.track).toBeNull();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
            expect(TrackManager.setupScrobbling).not.toHaveBeenCalled();
        });
    });

    describe('previousTrack', function() {
        beforeEach(function() {
            spyOn(TrackManager, 'setupScrobbling');
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdfubsdf'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$broadcast');
            service.previousTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdfubsdf'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdfubsdf&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdfubsdf'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf9sadfh'},
                {ID: 2, FileName: 2},
                {ID: 3, FileName: 3}
            ]);

            service.nextTrack();
            service.nextTrack();
            spyOn($rootScope, '$broadcast');
            TrackManager.setupScrobbling.calls.reset();
            service.previousTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf9sadfh'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf9sadfh&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdf9sadfh'});
        });

        it('should set the track to null if there is no previous track', function() {
            spyOn($rootScope, '$broadcast');
            service.previousTrack();

            expect(service.current.track).toBeNull();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
            expect(TrackManager.setupScrobbling).not.toHaveBeenCalled();
        });
    });

    describe('togglePause', function() {
        it('should broadcast a PlayerService.togglePause event', function() {
            spyOn($rootScope, '$broadcast');

            service.togglePause();

            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.togglePause');
        });
    });

    describe('volumeUpdate', function() {
        it('should broadcast a PlayerService.volumeUpdate event', function() {
            spyOn($rootScope, '$broadcast');

            service.volumeUpdate(0.3);

            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.volumeUpdate', 0.3);
        });
    });

    describe('positionUpdate', function() {
        it('should broadcast a PlayerService.positionUpdate event', function() {
            spyOn($rootScope, '$broadcast');

            service.positionUpdate(0.7);

            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.positionUpdate', 0.7);
        });
    });

    describe('trackPaused', function() {
        it('should call togglePauseScrobbling with false on the TrackManager', function() {
            spyOn(TrackManager, 'togglePauseScrobbling');

            service.trackPaused(false);

            expect(TrackManager.togglePauseScrobbling).toHaveBeenCalledWith(false);
        });

        it('should call togglePauseScrobbling with true on the TrackManager', function() {
            spyOn(TrackManager, 'togglePauseScrobbling');

            service.trackPaused(true);

            expect(TrackManager.togglePauseScrobbling).toHaveBeenCalledWith(true);
        });
    });

});

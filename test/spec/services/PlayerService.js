'use strict';

describe('Service: PlayerService', function() {

    var service,
        $rootScope,
        $q,
        PlaylistFactory,
        SessionData,
        TrackManager;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
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

    describe('controlHools.nextTrack', function() {
        beforeEach(function() {
            spyOn(TrackManager, 'setupScrobbling');
            spyOn(TrackManager, 'startConversion').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf97ug'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$emit');
            service.controlHooks.nextTrack();
            $rootScope.$digest();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf97ug'});
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf97ug&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdf97ug'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1},
                {ID: 2, FileName: 'asasdf8h'},
                {ID: 3, FileName: 3}
            ]);

            service.controlHooks.nextTrack();
            $rootScope.$digest();
            spyOn($rootScope, '$emit');
            TrackManager.setupScrobbling.calls.reset();
            service.controlHooks.nextTrack();
            $rootScope.$digest();

            expect(service.current.track).toEqual({ID: 2, FileName: 'asasdf8h'});
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asasdf8h&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 2, FileName: 'asasdf8h'});
        });

        it('should set the track to null if there is no next track', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1}
            ]);

            service.controlHooks.nextTrack();
            $rootScope.$digest();
            spyOn($rootScope, '$emit');
            TrackManager.setupScrobbling.calls.reset();
            service.controlHooks.nextTrack();
            $rootScope.$digest();

            expect(service.current.track).toBeNull();
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
            expect(TrackManager.setupScrobbling).not.toHaveBeenCalled();
        });
    });

    describe('controlHools.previousTrack', function() {
        beforeEach(function() {
            spyOn(TrackManager, 'setupScrobbling');
            spyOn(TrackManager, 'startConversion').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdfubsdf'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$emit');
            service.controlHooks.previousTrack();
            $rootScope.$digest();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdfubsdf'});
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdfubsdf&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdfubsdf'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf9sadfh'},
                {ID: 2, FileName: 2},
                {ID: 3, FileName: 3}
            ]);

            service.controlHooks.nextTrack();
            $rootScope.$digest();
            service.controlHooks.nextTrack();
            $rootScope.$digest();
            spyOn($rootScope, '$emit');
            TrackManager.setupScrobbling.calls.reset();
            service.controlHooks.previousTrack();
            $rootScope.$digest();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf9sadfh'});
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf9sadfh&Session=SessionKey', type: 'audio/mp4'});
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith({ID: 1, FileName: 'asdf9sadfh'});
        });

        it('should set the track to null if there is no previous track', function() {
            spyOn($rootScope, '$emit');
            service.controlHooks.previousTrack();

            expect(service.current.track).toBeNull();
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
            expect(TrackManager.setupScrobbling).not.toHaveBeenCalled();
        });
    });

    describe('controlHools.togglePause', function() {
        it('should broadcast a PlayerService.play event if current.isPlaying is false', function() {
            spyOn($rootScope, '$emit');
            service.current.isPlaying = false;

            service.controlHooks.togglePause();

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.play');
        });

        it('should broadcast a PlayerService.pause event if current.isPlaying is true', function() {
            spyOn($rootScope, '$emit');
            service.current.isPlaying = true;

            service.controlHooks.togglePause();

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.pause');
        });
    });

    describe('controlHools.volumeUpdate', function() {
        it('should broadcast a PlayerService.volumeUpdate event', function() {
            spyOn($rootScope, '$emit');

            service.controlHooks.volumeUpdate(0.3);

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.volumeUpdate', 0.3);
        });
    });

    describe('controlHools.positionUpdate', function() {
        it('should broadcast a PlayerService.positionUpdate event', function() {
            spyOn($rootScope, '$emit');

            service.controlHooks.positionUpdate(0.7);

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.positionUpdate', 0.7);
        });
    });

    describe('audioHooks.play', function() {
        it('should call togglePauseScrobbling with false on the TrackManager and set isPlaying to true', function() {
            spyOn(TrackManager, 'togglePauseScrobbling');
            service.current.isPlaying = false;

            service.audioHooks.play();

            expect(TrackManager.togglePauseScrobbling).toHaveBeenCalledWith(false);
            expect(service.current.isPlaying).toBe(true);
        });
    });

    describe('audioHooks.pause', function() {
        it('should call togglePauseScrobbling with true on the TrackManager and set isPlaying to false', function() {
            spyOn(TrackManager, 'togglePauseScrobbling');
            service.current.isPlaying = true;

            service.audioHooks.pause();

            expect(TrackManager.togglePauseScrobbling).toHaveBeenCalledWith(true);
            expect(service.current.isPlaying).toBe(false);
        });
    });

    describe('audioHooks.volumeChange', function() {
        it('should set the current volume', function() {
            service.current.volume = 0;

            service.audioHooks.volumeChange(0.53);

            expect(service.current.volume).toBe(0.53);
        });
    });

    describe('audioHooks.positionChange', function() {
        it('should set the current position', function() {
            service.current.position = 0;

            service.audioHooks.positionChange(0.46);

            expect(service.current.position).toBe(0.46);
        });
    });

    describe('audioHooks.ended', function() {
        it('should call controlHooks.nextTrack', function() {
            spyOn(service.controlHooks, 'nextTrack');

            service.audioHooks.ended();

            expect(service.controlHooks.nextTrack).toHaveBeenCalledWith();
        });
    });

});

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

    describe('controlHooks.changeTrack', function() {
        var conversionPromise;

        beforeEach(function() {
            spyOn(TrackManager, 'setupScrobbling');
            spyOn(TrackManager, 'startConversion').and.callFake(function() {
                conversionPromise = $q.defer();
                return conversionPromise.promise;
            });
            spyOn($rootScope, '$emit');
        });

        it('should emit a blank audioUpdate event and set the current track to null if the track argument evaluates to false', function() {
            service.current.track = {};
            service.controlHooks.changeTrack(null);

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
            expect(service.current.track).toBeNull();
        });

        it('should start track conversion if the track argument is set', function() {
            var mockTrack = {ID: 12152};

            service.controlHooks.changeTrack(mockTrack);

            expect(TrackManager.startConversion).toHaveBeenCalledWith(mockTrack);
        });

        it('should set the curent track to the track passed in and call nextTrack if the conversion fails', function() {
            var mockTrack = {ID: 12152};
            spyOn(service.controlHooks, 'nextTrack');

            service.controlHooks.changeTrack(mockTrack);
            conversionPromise.reject();
            $rootScope.$digest();

            expect(service.current.track).toBe(mockTrack);
            expect(service.controlHooks.nextTrack).toHaveBeenCalledWith();
        });

        it('should start the track playing and setup scrobbling if the conversion succeeds', function() {
            var mockTrack = {ID: 1, FileName: 'asdf97ug'};
            spyOn(service.controlHooks, 'nextTrack');

            service.controlHooks.changeTrack(mockTrack);
            conversionPromise.resolve();
            $rootScope.$digest();

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf97ug&Session=SessionKey', type: 'audio/mp4'});
            expect(service.current.track).toBe(mockTrack);
            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.play');
            expect(TrackManager.setupScrobbling).toHaveBeenCalledWith(mockTrack);
        });
    });

    describe('controlHooks.nextTrack', function() {
        beforeEach(function() {
            spyOn(service.controlHooks, 'changeTrack');
            spyOn(service.playlist, 'getRelativeTo');
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf97ug'},
                {ID: 2, FileName: 2}
            ]);

            service.controlHooks.nextTrack();

            expect(service.controlHooks.changeTrack).toHaveBeenCalledWith({ID: 1, FileName: 'asdf97ug'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1},
                {ID: 2, FileName: 'asasdf8h'},
                {ID: 3, FileName: 3}
            ]);
            service.current.track = service.playlist.tracks[0];
            service.playlist.getRelativeTo.and.returnValue('asdgds9a7g');

            service.controlHooks.nextTrack();

            expect(service.playlist.getRelativeTo).toHaveBeenCalledWith({ID: 1, FileName: 1}, false);
            expect(service.controlHooks.changeTrack).toHaveBeenCalledWith('asdgds9a7g');
        });
    });

    describe('controlHooks.previousTrack', function() {
        beforeEach(function() {
            spyOn(service.controlHooks, 'changeTrack');
            spyOn(service.playlist, 'getRelativeTo');
        });

        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf97ug'},
                {ID: 2, FileName: 2}
            ]);

            service.controlHooks.previousTrack();

            expect(service.controlHooks.changeTrack).toHaveBeenCalledWith({ID: 1, FileName: 'asdf97ug'});
        });

        it('should choose the previous track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1},
                {ID: 2, FileName: 'asasdf8h'},
                {ID: 3, FileName: 3}
            ]);
            service.current.track = service.playlist.tracks[1];
            service.playlist.getRelativeTo.and.returnValue('fa80ds7gf');

            service.controlHooks.previousTrack();

            expect(service.playlist.getRelativeTo).toHaveBeenCalledWith({ID: 2, FileName: 'asasdf8h'}, true);
            expect(service.controlHooks.changeTrack).toHaveBeenCalledWith('fa80ds7gf');
        });
    });

    describe('controlHooks.togglePause', function() {
        it('should broadcast a PlayerService.play event if current.isPlaying is false and there is a current track', function() {
            spyOn($rootScope, '$emit');
            service.current.track = {};
            service.current.isPlaying = false;

            service.controlHooks.togglePause();

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.play');
        });

        it('should load the next track if current.isPlaying is false and there is no current track', function() {
            spyOn(service.controlHooks, 'nextTrack');
            service.current.track = null;
            service.current.isPlaying = false;

            service.controlHooks.togglePause();

            expect(service.controlHooks.nextTrack).toHaveBeenCalledWith();
        });

        it('should broadcast a PlayerService.pause event if current.isPlaying is true', function() {
            spyOn($rootScope, '$emit');
            service.current.isPlaying = true;

            service.controlHooks.togglePause();

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.pause');
        });
    });

    describe('controlHooks.volumeUpdate', function() {
        it('should broadcast a PlayerService.volumeUpdate event', function() {
            spyOn($rootScope, '$emit');

            service.controlHooks.volumeUpdate(0.3);

            expect($rootScope.$emit).toHaveBeenCalledWith('PlayerService.volumeUpdate', 0.3);
        });
    });

    describe('controlHooks.positionUpdate', function() {
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

'use strict';

describe('Service: PlayerService', function() {

    var service,
        PlaylistFactory,
        $rootScope,
        SessionData;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            PlaylistFactory = $injector.get('PlaylistFactory');
            SessionData = $injector.get('SessionData');

            service = $injector.get('PlayerService', {
                PlaylistFactory: PlaylistFactory
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
        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdf97ug'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$broadcast');
            service.nextTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf97ug'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf97ug&Session=SessionKey', type: 'audio/mp4'});
        });

        it('should choose the next track if current.track is assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1},
                {ID: 2, FileName: 'asasdf8h'},
                {ID: 3, FileName: 3}
            ]);

            service.nextTrack();
            spyOn($rootScope, '$broadcast');
            service.nextTrack();

            expect(service.current.track).toEqual({ID: 2, FileName: 'asasdf8h'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asasdf8h&Session=SessionKey', type: 'audio/mp4'});
        });

        it('should set the track to null if there is no next track', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 1}
            ]);

            service.nextTrack();
            spyOn($rootScope, '$broadcast');
            service.nextTrack();

            expect(service.current.track).toBeNull();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
        });
    });

    describe('previousTrack', function() {
        it('should choose the first track if current.track is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1, FileName: 'asdfubsdf'},
                {ID: 2, FileName: 2}
            ]);

            spyOn($rootScope, '$broadcast');
            service.previousTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdfubsdf'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdfubsdf&Session=SessionKey', type: 'audio/mp4'});
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
            service.previousTrack();

            expect(service.current.track).toEqual({ID: 1, FileName: 'asdf9sadfh'});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '/stream?FileName=asdf9sadfh&Session=SessionKey', type: 'audio/mp4'});
        });

        it('should set the track to null if there is no previous track', function() {
            spyOn($rootScope, '$broadcast');
            service.previousTrack();

            expect(service.current.track).toBeNull();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('PlayerService.audioUpdate', {src: '', type: ''});
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

});

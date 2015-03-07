'use strict';

describe('Service: PlayerService', function() {

    var service,
        PlaylistFactory;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            PlaylistFactory = $injector.get('PlaylistFactory');

            service = $injector.get('PlayerService', {
                PlaylistFactory: PlaylistFactory
            });
        });
    });

    describe('initialisation', function() {
        it('should initialise player variables', function() {
            expect(service.currentTrack).toBeNull();
            expect(service.isPlaying).toBeFalsy();
            expect(service.volume).toBe(0.5);
            expect(service.position).toBe(0);
        });
    });

    describe('on', function() {
        it('should bind the trackChange event handler', function () {
            var trackChange = jasmine.createSpy('trackChange');
            service.on('trackChange', trackChange);

            service.nextTrack();

            expect(trackChange).toHaveBeenCalled();
        });

        it('should bind the playingChange event handler', function () {
            var playingChange = jasmine.createSpy('playingChange');
            service.on('playingChange', playingChange);

            service.setPlaying(true);

            expect(playingChange).toHaveBeenCalled();
        });

        it('should bind the trackChange event handler', function () {
            var volumeChange = jasmine.createSpy('volumeChange');
            service.on('volumeChange', volumeChange);

            service.setVolume(0.5);

            expect(volumeChange).toHaveBeenCalled();
        });

        it('should bind the trackChange event handler', function () {
            var positionChange = jasmine.createSpy('positionChange');
            service.on('positionChange', positionChange);

            service.setPosition(10);

            expect(positionChange).toHaveBeenCalled();
        });
    });

    describe('nextTrack', function() {
        it('should choose the first track if currentTrack is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1},
                {ID: 2}
            ]);

            service.nextTrack();

            expect(service.currentTrack).toEqual({ID: 1});
        });

        it('should choose the next track if currentTrack is assigned', function() {
            service.playlist.addTracks([
                {ID: 1},
                {ID: 2},
                {ID: 3}
            ]);

            service.nextTrack();
            service.nextTrack();

            expect(service.currentTrack).toEqual({ID: 2});
        });
    });

    describe('previousTrack', function() {
        it('should choose the first track if currentTrack is not assigned', function() {
            service.playlist.addTracks([
                {ID: 1},
                {ID: 2}
            ]);

            service.previousTrack();

            expect(service.currentTrack).toEqual({ID: 1});
        });

        it('should choose the next track if currentTrack is assigned', function() {
            service.playlist.addTracks([
                {ID: 1},
                {ID: 2},
                {ID: 3}
            ]);

            service.nextTrack();
            service.nextTrack();
            service.previousTrack();

            expect(service.currentTrack).toEqual({ID: 1});
        });
    });

    describe('setPlaying', function() {
        it('should update the value of isPlaying', function() {
            service.setPlaying(true);
            expect(service.isPlaying).toBeTruthy();

            service.setPlaying(false);
            expect(service.isPlaying).toBeFalsy();
        });
    });

    describe('setVolume', function() {
        it('should update the value of volume', function() {
            service.setVolume(0.8);
            expect(service.volume).toBe(0.8);
        });
    });

    describe('setPosition', function() {
        it('should update the value of position', function() {
            service.setPosition(0.79);
            expect(service.position).toBe(0.79);
        });
    });

});

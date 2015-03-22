'use strict';

describe('Factory: PlaylistFactory', function() {

    var service;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            var Factory = $injector.get('PlaylistFactory', {});
            service = new Factory();
        });
    });

    describe('addTrack', function() {
        it ('should call addTracks with the relativeTrack of the position specified', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);
            spyOn(service, 'addTracks');

            service.addTrack({ID: 3}, 1);
            expect(service.addTracks).toHaveBeenCalledWith([{ID: 3}], {ID: 2}, true);
        });

        it ('should call addTracks with the relativeTrack of the position specified, even if it is 0', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);
            spyOn(service, 'addTracks');

            service.addTrack({ID: 3}, 0);
            expect(service.addTracks).toHaveBeenCalledWith([{ID: 3}], {ID: 1}, true);
        });

        it('should call addTracks without the relativeTrack specified if a position is not specified', function() {
            spyOn(service, 'addTracks');
            service.addTrack({ID: 1});

            expect(service.addTracks).toHaveBeenCalledWith([{ID: 1}]);
        });
    });

    describe('addTracks', function() {
        it('should add multiple tracks to the end of the tracks array', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);
            service.addTracks([
                {ID: 3},
                {ID: 4}
            ]);

            expect(service.tracks).toEqual([
                {ID: 1},
                {ID: 2},
                {ID: 3},
                {ID: 4}
            ]);
        });

        it('should allow tracks to be added after a certain track', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);
            service.addTracks([
                {ID: 3},
                {ID: 4}
            ], service.tracks[0], false);

            expect(service.tracks).toEqual([
                {ID: 1},
                {ID: 3},
                {ID: 4},
                {ID: 2}
            ]);
        });

        it('should allow tracks to be added before a certain track', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);
            service.addTracks([
                {ID: 3},
                {ID: 4}
            ], service.tracks[0], true);

            expect(service.tracks).toEqual([
                {ID: 3},
                {ID: 4},
                {ID: 1},
                {ID: 2}
            ]);
        });
    });

    describe('removeTracks', function() {
        it('should allow multiple tracks to be removed from the tracks', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2},
                {ID: 3},
                {ID: 4}
            ]);

            service.removeTracks([
                service.tracks[1],
                service.tracks[3]
            ]);

            expect(service.tracks).toEqual([
                {ID: 1},
                {ID: 3}
            ]);
        });
    });

    describe('selectTracks', function() {
        it('should add the selected property to a given set of tracks', function() {
            service.addTracks([
                {ID: 1, selected: true},
                {ID: 2},
                {ID: 3},
                {ID: 4}
            ]);

            service.selectTracks([
                service.tracks[1],
                service.tracks[3]
            ]);

            expect(service.tracks).toEqual([
                {ID: 1},
                {ID: 2, selected: true},
                {ID: 3},
                {ID: 4, selected: true}
            ])
        });
    });

    describe('getRelativeTo', function() {
        it('should return the previous track if before is true', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);

            expect(service.getRelativeTo(service.tracks[1], true)).toEqual({ID: 1});
        });

        it('should return the next track if before is false', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);

            expect(service.getRelativeTo(service.tracks[0], false)).toEqual({ID: 2});
        });

        it('should return undefined if the track is not found, or if there is no previous/next track', function() {
            service.addTracks([
                {ID: 1},
                {ID: 2}
            ]);

            expect(service.getRelativeTo({ID: 3}, true)).not.toBeDefined();
            expect(service.getRelativeTo(service.tracks[0], true)).not.toBeDefined();
            expect(service.getRelativeTo(service.tracks[1], false)).not.toBeDefined();
        });
    });

});

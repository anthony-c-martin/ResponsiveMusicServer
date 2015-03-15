'use strict';

describe('Factory: SelectableTracks', function() {

    var service,
        $q,
        $rootScope;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');

            var Factory = $injector.get('SelectableTracks');
            service = new Factory();
        });
    });

    describe('initialisation', function() {
        it('should create allTracks as an empty array, and lastSelected to false', function() {
            expect(service.allTracks).toEqual([]);
            expect(service.lastSelected).toBeFalsy();
        });
    });

    describe('trackSelected', function() {
        beforeEach(function() {
            service.allTracks = [{
                ID: 19287
            }, {
                ID: 12986
            }, {
                ID: 19262
            }, {
                ID: 86728
            }];
        });

        it('should select a given track and update lastSelected if no modifier keys are pressed and the track is not selected', function() {
            service.trackSelected(service.allTracks[1], false, false);

            expect(service.allTracks[1].selected).toBeTruthy();
            expect(service.lastSelected).toBe(service.allTracks[1]);
        });

        it('should keep a given track selected but not update lastSelected if no modifier keys are pressed and the track is selected', function() {
            service.allTracks[1].selected = true;
            service.lastSelected = false;

            service.trackSelected(service.allTracks[1], false, false);

            expect(service.allTracks[1].selected).toBeTruthy();
            expect(service.lastSelected).not.toBe(service.allTracks[1]);
        });

        it('should deselect all tracks apart from the selected track if no modifier keys are pressed and the track is not selected', function() {
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;

            service.trackSelected(service.allTracks[1], false, false);

            expect(service.allTracks[0].selected).toBeFalsy();
            expect(service.allTracks[3].selected).toBeFalsy();
        });

        it('should leave all tracks apart from the selected track unchanged if no modifier keys are pressed and the track is selected', function() {
            service.allTracks[0].selected = true;
            service.allTracks[1].selected = true;
            service.allTracks[3].selected = true;

            service.trackSelected(service.allTracks[1], false, false);

            expect(service.allTracks[0].selected).toBeTruthy();
            expect(service.allTracks[1].selected).toBeTruthy();
            expect(service.allTracks[3].selected).toBeTruthy();
        });

        it('should add the new track to the selection if control is pressed', function() {
            service.lastSelected = service.allTracks[0];
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;

            service.trackSelected(service.allTracks[2], false, true);

            expect(service.allTracks[0].selected).toBeTruthy();
            expect(service.allTracks[2].selected).toBeTruthy();
            expect(service.allTracks[3].selected).toBeTruthy();
        });

        it('should reset the selection and set the lastSelected to the selected track if control is pressed and no tracks are selected', function() {
            service.lastSelected = false;

            service.trackSelected(service.allTracks[2], false, true);

            expect(service.allTracks[2].selected).toBeTruthy();
            expect(service.lastSelected).toBe(service.allTracks[2]);
        });

        it('should invert the selected track if it is already selected and control is pressed', function() {
            service.allTracks[2].selected = true;
            service.allTracks[3].selected = true;
            service.lastSelected = service.allTracks[3];

            service.trackSelected(service.allTracks[2], false, true);

            expect(service.allTracks[2].selected).toBeFalsy();
            expect(service.allTracks[3].selected).toBeTruthy();
        });

        it('should select all tracks between the last selected and the current if shift is pressed', function() {
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;
            service.lastSelected = service.allTracks[0];

            service.trackSelected(service.allTracks[2], true, false);

            expect(service.allTracks[0].selected).toBeTruthy();
            expect(service.allTracks[1].selected).toBeTruthy();
            expect(service.allTracks[2].selected).toBeTruthy();
            expect(service.allTracks[3].selected).toBeFalsy();
        });

        it('should select all tracks between the last selected and the current if shift is pressed', function() {
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;
            service.lastSelected = service.allTracks[3];

            service.trackSelected(service.allTracks[1], true, false);

            expect(service.allTracks[0].selected).toBeFalsy();
            expect(service.allTracks[1].selected).toBeTruthy();
            expect(service.allTracks[2].selected).toBeTruthy();
            expect(service.allTracks[3].selected).toBeTruthy();
        });
    });

    describe('listTracks', function() {
        beforeEach(function() {
            service.allTracks = [{
                ID: 19287
            }, {
                ID: 12986
            }, {
                ID: 19262
            }, {
                ID: 86728
            }];
        });

        it('should return a list of all the selected tracks', function() {
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;

            expect(service.listTracks()).toEqual([{
                ID: 19287,
                selected: true
            }, {
                ID: 86728,
                selected: true
            }]);
        });

        it('should delete the originals if asked to', function() {
            service.allTracks[0].selected = true;
            service.allTracks[3].selected = true;

            expect(service.listTracks(true)).toEqual([{
                ID: 19287,
                selected: true
            }, {
                ID: 86728,
                selected: true
            }]);

            expect(service.allTracks).toEqual([{
                ID: 12986
            }, {
                ID: 19262
            }]);
        });
    });

    describe('clearSelection', function() {
        beforeEach(function() {
            service.allTracks = [{
                ID: 19287
            }, {
                ID: 12986,
                selected: true
            }, {
                ID: 19262
            }, {
                ID: 86728,
                selected: true
            }];
        });

        it('should clear the selected tracks', function() {
            service.clearSelection();

            expect(service.allTracks[0].selected).toBeFalsy();
            expect(service.allTracks[1].selected).toBeFalsy();
            expect(service.allTracks[2].selected).toBeFalsy();
            expect(service.allTracks[3].selected).toBeFalsy();
        });
    });

    describe('removeSelection', function() {
        beforeEach(function() {
            service.allTracks = [{
                ID: 19287
            }, {
                ID: 12986,
                selected: true
            }, {
                ID: 19262
            }, {
                ID: 86728,
                selected: true
            }];
        });

        it('should remove all of the selected tracks', function() {
            service.removeSelection();

            expect(service.allTracks).toEqual([{
                ID: 19287
            }, {
                ID: 19262
            }]);
        });
    });
});

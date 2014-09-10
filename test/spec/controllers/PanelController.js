'use strict';

describe('Controller: PanelController', function() {

    var mockTracks = {};
    var mockSelectableTracks = {};
    beforeEach(module('musicServerApp', function($provide) {
        $provide.value('SelectableTracks', jasmine.createSpy('SelectableTracksSpy').andCallFake(function() {
            return mockSelectableTracks;
        }));
    }));

    var PanelController,
        $scope, $rootScope, SelectableTracks, $q;

    beforeEach(inject(function($controller, _$rootScope_, _SelectableTracks_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $scope.tracks = mockTracks;
        $q = _$q_;
        SelectableTracks = _SelectableTracks_;

        PanelController = $controller('PanelController', {
            $rootScope: $rootScope,
            $scope: $scope,
            SelectableTracks: _SelectableTracks_
        });
    }));

    it('should show artists, albums and tracks when in desktop mode and nothing selected', function() {
        $scope.isDesktop = true;
        $scope.isPhone = false;

        $scope.selectedAlbum = null;
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeTruthy();
    });
    it('should show artists, albums and tracks when in desktop mode and an album selected', function() {
        $scope.isDesktop = true;
        $scope.isPhone = false;

        $scope.selectedAlbum = {};
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeTruthy();
    });
    it('should show artists, albums and tracks when in desktop mode and an album and artist selected', function() {
        $scope.isDesktop = true;
        $scope.isPhone = false;


        $scope.selectedAlbum = {};
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeTruthy();
    });
    it('should show artists, albums and tracks when in desktop mode and an artist selected', function() {
        $scope.isDesktop = true;
        $scope.isPhone = false;


        $scope.selectedAlbum = null;
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeTruthy();
    });

    it('should only show artists and albums when in tablet mode and nothing selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = false;

        $scope.selectedAlbum = null;
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeFalsy();
    });
    it('should only show artists and albums when in tablet mode and an album selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = false;


        $scope.selectedAlbum = {};
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeFalsy();
    });
    it('should only show tracks and albums when in tablet mode and an album and artist selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = false;


        $scope.selectedAlbum = {};
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeFalsy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeTruthy();
    });
    it('should only show artists and albums when in tablet mode and an artist but no album selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = false;


        $scope.selectedAlbum = null;
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeFalsy();
    });

    it('should only show artists when in phone mode and no artists or albums selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = true;

        $scope.selectedAlbum = null;
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeFalsy();
        expect($scope.isTracksShown()).toBeFalsy();
    });
    it('should only show artists when in phone mode and an album but no artist selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = true;


        $scope.selectedAlbum = {};
        $scope.selectedArtist = null;
        expect($scope.isArtistsShown()).toBeTruthy();
        expect($scope.isAlbumsShown()).toBeFalsy();
        expect($scope.isTracksShown()).toBeFalsy();
    });
    it('should only show tracks when in phone mode and an album and artist selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = true;


        $scope.selectedAlbum = {};
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeFalsy();
        expect($scope.isAlbumsShown()).toBeFalsy();
        expect($scope.isTracksShown()).toBeTruthy();
    });
    it('should only show albums when in phone mode and an artist but no album selected', function() {
        $scope.isDesktop = false;
        $scope.isPhone = true;


        $scope.selectedAlbum = null;
        $scope.selectedArtist = {};
        expect($scope.isArtistsShown()).toBeFalsy();
        expect($scope.isAlbumsShown()).toBeTruthy();
        expect($scope.isTracksShown()).toBeFalsy();
    });

    it('should stop propagation and call the clearSelection function on the trackArea when deselectTracks is called', function() {
        var mockEvent = {
            stopPropagation: function() { }
        };
        spyOn(mockEvent, 'stopPropagation');
        var mockTrackArea = {
            clearSelection: function() { }
        };
        spyOn(mockTrackArea, 'clearSelection');
        $scope.trackArea = mockTrackArea;

        $scope.deselectTracks(mockEvent);

        expect(mockEvent.stopPropagation).toHaveBeenCalledWith();
        expect(mockEvent.stopPropagation.callCount).toBe(1);
        expect(mockTrackArea.clearSelection).toHaveBeenCalledWith();
        expect(mockTrackArea.clearSelection.callCount).toBe(1);
    });

    it('should clear the selected album when deselectAlbum is called', function() {
        $scope.selectedAlbum = {};
        $scope.selectedArtist = {};

        $scope.deselectAlbum();

        expect($scope.selectedAlbum).toBeNull();
        expect($scope.selectedArtist).not.toBeNull();
    });

    it('should clear the selected artist and album when deselectArtist is called', function() {
        $scope.selectedAlbum = {};
        $scope.selectedArtist = {};

        $scope.deselectArtist();

        expect($scope.selectedAlbum).toBeNull();
        expect($scope.selectedArtist).toBeNull();
    });

    it('should set the selectedAlbum on receiving the selectAlbum event', function() {
        var mockAlbum = { };
        $scope.selectedAlbum = null;

        $rootScope.$emit('selectAlbum', mockAlbum);

        expect($scope.selectedAlbum).toBe(mockAlbum);
    });

    it('should set the selectedArtist and clear the selectedAlbum on receiving the selectArtist event', function() {
        var mockArtist = { };
        $scope.selectedAlbum = { };
        $scope.selectedArtist = { };

        $rootScope.$emit('selectArtist', mockArtist);

        expect($scope.selectedArtist).toBe(mockArtist);
        expect($scope.selectedAlbum).toBeNull();
    });

    it('should create a new SelectableTracks object', function() {
        expect(SelectableTracks).toHaveBeenCalledWith();
        expect(SelectableTracks.callCount).toBe(1);

        expect($scope.trackArea).toBe(mockSelectableTracks);
        expect($scope.trackArea.allTracks).toBe(mockTracks);
    });
});

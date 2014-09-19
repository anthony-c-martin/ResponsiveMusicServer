'use strict';

describe('Controller: PlayerController', function() {

    var mockTrack = {};
    var mockPlaylist = {
        getTrack: function() {
            return $q.when(mockTrack);
        }
    };
    beforeEach(module('musicServerApp', function($provide) {
        $provide.value('Playlist', mockPlaylist);
    }));

    var PlayerController,
        $scope, $rootScope, Playlist, $q;

    beforeEach(inject(function($controller, _$rootScope_, _Playlist_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        Playlist = _Playlist_;

        PlayerController = $controller('PlayerController', {
            $rootScope: $rootScope,
            $scope: $scope,
            Playlist: _Playlist_
        });
    }));

    it('should initialise settings correctly', function() {
        expect($scope.playing).toBeFalsy();
        expect($scope.track).toBeFalsy();
        expect($scope.setVolume).toBe(0.5);
        expect($scope.setPosition).toBe(0);
    });

    it('should call next on the StartPlaying event', function() {
        spyOn($scope, 'next');

        $rootScope.$emit('StartPlaying');

        expect($scope.next).toHaveBeenCalledWith(true);
        expect($scope.next.callCount).toBe(1);
    });

    it('should update the position on the SetPosition event', function() {
        $scope.setPosition = 0;

        $scope.$emit('SetPosition', 0.7);

        expect($scope.setPosition).toBe(0.7);
    });

    it('should update setPlaying to true when togglePause is called if a paused track is loaded', function() {
        $scope.setPlaying = false;
        $scope.playing = false;
        $scope.track = {};

        $scope.togglePause();

        expect($scope.setPlaying).toBeTruthy();
    });

    it('should update setPlaying to false when togglePause is called if a playing track is loaded', function() {
        $scope.setPlaying = false;
        $scope.playing = true;
        $scope.track = {};

        $scope.togglePause();

        expect($scope.setPlaying).toBeFalsy();
    });

    it('should call next if a togglePause is called when no track is loaded', function() {
        spyOn($scope, 'next');
        $scope.track = null;

        $scope.togglePause();

        expect($scope.next).toHaveBeenCalledWith(true);
        expect($scope.next.callCount).toBe(1);
    });

    it('should load the next track and start playing when scope.next is called with startPlaying set to true', function() {
        spyOn(Playlist, 'getTrack').andCallThrough();
        $scope.setPlaying = false;

        $scope.next(true);

        expect(Playlist.getTrack).toHaveBeenCalledWith();
        expect(Playlist.getTrack.callCount).toBe(1);
        $scope.$digest();
        expect($scope.track).toBe(mockTrack);
        expect($scope.setPlaying).toBeTruthy();
    });

    it('should load the next track and not change the playing state when scope.next is called with startPlaying set to false', function() {
        spyOn(Playlist, 'getTrack').andCallThrough();
        $scope.setPlaying = false;

        $scope.next(false);

        expect(Playlist.getTrack).toHaveBeenCalledWith();
        expect(Playlist.getTrack.callCount).toBe(1);
        $scope.$digest();
        expect($scope.track).toBe(mockTrack);
        expect($scope.setPlaying).toBeFalsy();
    });

    it('should reset the position if scope.next is called and there is no next track', function() {
        spyOn(Playlist, 'getTrack').andReturn($q.reject());
        $scope.setPlaying = false;
        $scope.setPosition = 0.8;

        $scope.next(true);

        expect(Playlist.getTrack).toHaveBeenCalledWith();
        expect(Playlist.getTrack.callCount).toBe(1);
        $scope.$digest();
        expect($scope.setPosition).toBe(0);
    });

    it('should reset the position when scope.prev is called', function() {
        $scope.setPosition = 0.5;

        $scope.prev();

        expect($scope.setPosition).toBe(0);
    });
});

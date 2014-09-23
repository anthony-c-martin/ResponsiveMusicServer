'use strict';

describe('Controller: PlayerController', function() {

    var controller,
        Playlist,
        $scope,
        $rootScope,
        $q;

    var mockTrack = {};
    var mockPlaylist = {
        getTrack: function() {
            return $q.when(mockTrack);
        }
    };

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            Playlist = mockPlaylist;
            var $controller = $injector.get('$controller');

            controller = $controller('PlayerController', {
                $rootScope: $rootScope,
                $scope: $scope,
                Playlist: Playlist
            });
        });
    });

    it('should initialise settings correctly', function() {
        expect($scope.playing).toBeFalsy();
        expect($scope.track).toBeFalsy();
        expect($scope.setVolume).toBe(0.5);
        expect($scope.setPosition).toBe(0);
    });

    it('should call next on the StartPlaying event', function() {
        spyOn(controller, 'next');

        $rootScope.$emit('StartPlaying');

        expect(controller.next).toHaveBeenCalledWith(true);
        expect(controller.next.callCount).toBe(1);
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

        controller.togglePause();

        expect($scope.setPlaying).toBeTruthy();
    });

    it('should update setPlaying to false when togglePause is called if a playing track is loaded', function() {
        $scope.setPlaying = false;
        $scope.playing = true;
        $scope.track = {};

        controller.togglePause();

        expect($scope.setPlaying).toBeFalsy();
    });

    it('should call next if a togglePause is called when no track is loaded', function() {
        spyOn(controller, 'next');
        $scope.track = null;

        controller.togglePause();

        expect(controller.next).toHaveBeenCalledWith(true);
        expect(controller.next.callCount).toBe(1);
    });

    it('should load the next track and start playing when scope.next is called with startPlaying set to true', function() {
        spyOn(Playlist, 'getTrack').andCallThrough();
        $scope.setPlaying = false;

        controller.next(true);

        expect(Playlist.getTrack).toHaveBeenCalledWith();
        expect(Playlist.getTrack.callCount).toBe(1);
        $scope.$digest();
        expect($scope.track).toBe(mockTrack);
        expect($scope.setPlaying).toBeTruthy();
    });

    it('should load the next track and not change the playing state when scope.next is called with startPlaying set to false', function() {
        spyOn(Playlist, 'getTrack').andCallThrough();
        $scope.setPlaying = false;

        controller.next(false);

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

        controller.next(true);

        expect(Playlist.getTrack).toHaveBeenCalledWith();
        expect(Playlist.getTrack.callCount).toBe(1);
        $scope.$digest();
        expect($scope.setPosition).toBe(0);
    });

    it('should reset the position when scope.prev is called', function() {
        $scope.setPosition = 0.5;

        controller.prev();

        expect($scope.setPosition).toBe(0);
    });
});

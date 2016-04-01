/* jshint -W117, -W030 */
describe('app.components.track.TrackController', function() {

  beforeEach(module('app.components.track'));
  beforeEach(inject(function($controller, $rootScope, $state, $q, playerService) {
    window.$scope = $rootScope.$new();
    window.$rootScope = $rootScope;
    window.$state = $state;
    window.$q = $q;
    window.playerService = playerService;

    window.controller = $controller('TrackController', {
      $scope: $scope,
      $state: $state,
      playerService: playerService
    });
    controller.track = {
      Name: 'Evelynn, a modified dog',
      ID: 362
    };
  }));

  describe('play', function() {
    it('should clear the playlist, call addTrack on the playlist, and then select the next track', function() {
      spyOn(playerService.playlist, 'clear');
      spyOn(playerService.playlist, 'addTrack').and.returnValue($q.when());
      spyOn(playerService.controlHooks, 'nextTrack');

      controller.play();

      expect(playerService.playlist.clear).toHaveBeenCalledWith();
      expect(playerService.playlist.addTrack).toHaveBeenCalledWith(controller.track);
      $scope.$digest();
      expect(playerService.controlHooks.nextTrack).toHaveBeenCalledWith();
    });
  });

  describe('add', function() {
    it('should call addTrack on the playlist', function() {
      spyOn(playerService.playlist, 'addTrack');

      controller.add();

      expect(playerService.playlist.addTrack).toHaveBeenCalledWith(controller.track);
    });
  });

  describe('remove', function() {
    it('should call removeTrack on the playlist', function() {
      spyOn(playerService.playlist, 'removeTrack');

      controller.remove();

      expect(playerService.playlist.removeTrack).toHaveBeenCalledWith(controller.track);
    });
  });

  describe('select', function() {
    it('should call trackSelected on the trackArea when the select function is called', function() {
      spyOn($scope, '$emit');
      var mockTrack = {};
      controller.track = mockTrack;
      var mockEvent = {
        stopPropagation: function() {},
        shiftKey: true,
        ctrlKey: false,
        metaKey: true
      };
      spyOn(mockEvent, 'stopPropagation');
      var mockTrackArea = {
        trackSelected: function() {}
      };
      spyOn(mockTrackArea, 'trackSelected');
      controller.trackArea = mockTrackArea;

      controller.select(mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockTrackArea.trackSelected).toHaveBeenCalledWith(mockTrack, true, true);
      expect(mockTrackArea.trackSelected.calls.count()).toBe(1);
    });

    it('should do nothing when the select function is called if the trackArea is not set', function() {
      spyOn($scope, '$emit');
      var mockTrack = {};
      $scope.track = mockTrack;
      var mockEvent = {
        stopPropagation: function() {}
      };
      spyOn(mockEvent, 'stopPropagation');
      $scope.trackArea = null;

      controller.select(mockEvent);

      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });
  });
});

/* jshint -W117, -W030 */
describe('app.music.MusicController', function() {

  var controller;

  var artist1 = {ID: 32983, Name: 'Frank Zappa'};
  var artist2 = {ID: 12342, Name: 'Captain Beefheart'};
  var artist3 = {ID: 12387, Name: 'Some Guy'};
  var album1 = {ID: 23982, Name: 'Apostrophe'};
  var album2 = {ID: 21239, Name: 'Trout Mask Replica'};
  var track1 = {ID: 23980, Name: 'Uncle Remus'};
  var track2 = {ID: 29380, Name: 'Pachuco Cadaver'};

  beforeEach(module('app.music'));
  beforeEach(inject(function($controller, $q, $rootScope, $state, playerService, ApiFactory) {
    window.$scope = $rootScope.$new();
    window.$rootScope = $rootScope;
    window.$state = $state;
    window.playerService = playerService;
    window.ApiFactory = ApiFactory;
    window.$q = $q;

    controller = $controller('MusicController', {
      $scope: $scope,
      $state: $state,
      playerService: playerService,
      ApiFactory: ApiFactory
    });
  }));

  describe('initialisation', function() {
    it('should initialise artists, albums and tracks on start', function() {
      expect(controller.artists).toEqual([]);
      expect(controller.albums).toEqual([]);
      expect(controller.tracks).toEqual([]);
    });
  });

  describe('event: $stateChangeSuccess', function() {
    beforeEach(function() {
      spyOn(ApiFactory.artist, 'getAll').and.returnValue($q.when([artist1, artist2]));
      spyOn(ApiFactory.album, 'getFromArtist').and.callFake(function(artistId) {
        if (artistId === artist1.ID) {
          return $q.when([album1]);
        }
        if (artistId === artist2.ID) {
          return $q.when([album2]);
        }
      });
      spyOn(ApiFactory.track, 'getFromAlbum').and.callFake(function(albumId) {
        if (albumId === album1.ID) {
          return $q.when([track1]);
        }
        if (albumId === album2.ID) {
          return $q.when([track2]);
        }
      });
    });

    describe('first time', function() {
      it('should load artists the first time it is called after initialisation', function() {
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([]);
        expect(controller.tracks).toEqual([]);
      });

      it('should only load artists the first time it is called after initialisation', function() {
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();
        ApiFactory.artist.getAll.and.returnValue($q.when([artist3]));

        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([]);
        expect(controller.tracks).toEqual([]);
      });

      it('should load albums if an artistId is supplied', function() {
        $state.params.artistId = artist2.ID;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([album2]);
        expect(controller.tracks).toEqual([]);
      });

      it('should load tracks if an albumId is supplied', function() {
        $state.params.artistId = artist1.ID;
        $state.params.albumId = album1.ID;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([album1]);
        expect(controller.tracks).toEqual([track1]);
      });
    });

    describe('after first time', function() {
      beforeEach(function() {
        $state.params.artistId = artist1.ID;
        $state.params.albumId = album1.ID;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();
      });

      it('should clear the albums and tracks if the artistId and albumId are not supplied', function() {
        $state.params.artistId = 0;
        $state.params.albumId = 0;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([]);
        expect(controller.tracks).toEqual([]);
      });

      it('should change the albums if the artistId is updated', function() {
        $state.params.artistId = artist2.ID;
        $state.params.albumId = 0;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([album2]);
        expect(controller.tracks).toEqual([]);
      });

      it('should change the albums and tracks if the artistId and albumId are updated', function() {
        $state.params.artistId = artist2.ID;
        $state.params.albumId = album2.ID;
        $scope.$emit('$stateChangeSuccess');
        $rootScope.$apply();

        expect(controller.artists).toEqual([artist1, artist2]);
        expect(controller.albums).toEqual([album2]);
        expect(controller.tracks).toEqual([track2]);
      });
    });
  });

  describe('loadMoreArtists', function() {

  });

  describe('loadMoreAlbums', function() {

  });

  describe('loadMoreTracks', function() {

  });

});

/* jshint -W117, -W030 */
describe('app.services.api.ApiFactory', function() {

  var service;

  var mockResponse = {
    SomeKey: 'someResponse'
  };
  var successSpy;

  beforeEach(module('app.services.api'));
  beforeEach(inject(function($injector, $httpBackend, sessionService, HttpFactory) {
    window.$httpBackend = $httpBackend;
    window.sessionService = sessionService;
    window.HttpFactory = HttpFactory;

    service = $injector.get('ApiFactory', {
      HttpFactory: HttpFactory,
      sessionService: sessionService
    });

    sessionService.setSession({
      Key: 'testSessionKey',
      Secret: 'testSessionSecret'
    });
    sessionService.jsonURL = '/testSessionUrl';

    successSpy = jasmine.createSpy('successSpy');
  }));

  describe('artist', function() {
    it('should submit a correctly-formatted GetArtists request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetArtists',
        Session: 'testSessionKey',
        Start: 193,
        Limit: 27,
        Signature: '7ecbc07e49f5b91fbe6d61e5084ebcf8'
      }).respond(mockResponse);

      service.artist.getAll(193, 27).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted SearchArtists request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'SearchArtists',
        Session: 'testSessionKey',
        String: 'sdfasfasd34wes',
        Start: 45,
        Limit: 29,
        Signature: '3254d4aa43ac2cd936d88d87ef60243c'
      }).respond(mockResponse);

      service.artist.search('sdfasfasd34wes', 45, 29).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('album', function() {
    it('should submit a correctly-formatted GetAlbums request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetAlbums',
        Session: 'testSessionKey',
        Start: 87,
        Limit: 19,
        Signature: 'ba777946855c97fa04e5765625cb2ef6'
      }).respond(mockResponse);

      service.album.getAll(87, 19).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted GetAlbumsByArtist request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetAlbumsByArtist',
        Session: 'testSessionKey',
        ID: 12364,
        Start: 23,
        Limit: 39,
        Signature: '0a93dc91846321695b39242df0fdf79f'
      }).respond(mockResponse);

      service.album.getFromArtist(12364, 23, 39).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted SearchAlbums request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'SearchAlbums',
        Session: 'testSessionKey',
        String: 'asdfs08h8s7dhf8h',
        Start: 87,
        Limit: 19,
        Signature: '897269c5a7eacd9fd260df69c9ac271c'
      }).respond(mockResponse);

      service.album.search('asdfs08h8s7dhf8h', 87, 19).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('track', function() {
    it('should submit a correctly-formatted GetTracks request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetTracks',
        Session: 'testSessionKey',
        Start: 31,
        Limit: 24,
        Signature: 'f61f71a6d765336613958a7923d91327'
      }).respond(mockResponse);

      service.track.getAll(31, 24).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted GetTracksByArtist request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetTracksByArtist',
        Session: 'testSessionKey',
        ID: 35326,
        Start: 120,
        Limit: 31,
        Signature: '6d96d46d027e8d9e6dc47d980b877db3'
      }).respond(mockResponse);

      service.track.getFromArtist(35326, 120, 31).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted GetTracksByAlbum request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetTracksByAlbum',
        Session: 'testSessionKey',
        ID: 12486,
        Start: 197,
        Limit: 912,
        Signature: '73ca7d058d272b399535f5ac6108d3f7'
      }).respond(mockResponse);
      service.track.getFromAlbum(12486, 197, 912).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted ConvertTrackByID request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'ConvertTrackByID',
        Session: 'testSessionKey',
        String: 'dfjdhfsjkfsbkdhfbuiy',
        Signature: '647ea1d083f22eecf6d1057bc1200b85'
      }).respond(mockResponse);

      service.track.convert('dfjdhfsjkfsbkdhfbuiy').then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted LFMNowPlayingTrack request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'LFMNowPlayingTrack',
        Session: 'testSessionKey',
        String: 'sdf9basd8yfhio',
        Signature: '97accd5f7efa66cc6bde99bf85cb3aa5'
      }).respond(mockResponse);

      service.track.lastFMNowPlaying('sdf9basd8yfhio').then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted LFMScrobbleTrack request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'LFMScrobbleTrack',
        Session: 'testSessionKey',
        String: 'sdfg87s6dgf7sgyui',
        Signature: '85330096dad0e0d72e80fc277750e38a'
      }).respond(mockResponse);

      service.track.lastFMScrobble('sdfg87s6dgf7sgyui').then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted SearchTracks request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'SearchTracks',
        Session: 'testSessionKey',
        String: 'asdfas8bfsiaufb',
        Start: 124,
        Limit: 13,
        Signature: 'e6e5a0261cf8726ea95164e62bfeaa11'
      }).respond(mockResponse);

      service.track.search('asdfas8bfsiaufb', 124, 13).then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('session', function() {
    it('should submit a correctly-formatted GetToken request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetToken',
        Signature: '7a60187550fce5fd85929b245077fe20'
      }).respond(mockResponse);

      service.session.getToken().then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted GetSession request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetSession',
        Signature: 'cad406b2cb3f38eb55870aeb8d2edd3a'
      }).respond(mockResponse);

      service.session.getSession().then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should submit a correctly-formatted GetUserPreferences request', function() {
      $httpBackend.expectPOST('/testSessionUrl', {
        Command: 'GetUserPreferences',
        Session: 'testSessionKey',
        Signature: 'df322e5e0e7416b3e62b1c19fbaf11ed'
      }).respond(mockResponse);

      service.session.getUserPreferences().then(successSpy);
      $httpBackend.flush();

      expect(successSpy).toHaveBeenCalledWith(mockResponse);
    });
  });
});

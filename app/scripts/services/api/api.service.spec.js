/* jshint -W117, -W030 */
describe('Factory: apiService', function() {

    var service,
        $httpBackend,
        $rootScope,
        httpService,
        sessionService;

    beforeEach(function() {
        module('app.services.api');

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            sessionService = $injector.get('sessionService');
            httpService = $injector.get('httpService');

            service = $injector.get('apiService', {
                httpService: httpService,
                sessionService: sessionService
            });

            sessionService.setSession({
                Key: 'SessionKey',
                Secret: 'SessionSecret'
            });
        });
    });

    describe('sessionService access', function() {
        it('should use the url specified by the sessionService object', function() {
            sessionService.jsonURL = '/asdgsadinosf';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/asdgsadinosf').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.artist.getAll().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should use seesion key and secret specified by the sessionService object', function() {
            sessionService.setSession({
                Key: 'asdgiuasdfisdbfj9a89',
                Secret: 'asdf97g87fgdsfiuh'
            });
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.artist.getAll().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetArtists',
                Session: 'asdgiuasdfisdbfj9a89',
                Signature: 'e8e0dff3e2396f7d15f83ac36fc8e7f6'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('artist', function() {
        it('should submit a correctly-formatted GetArtists request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.artist.getAll().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetArtists',
                Session: 'SessionKey',
                Signature: 'f571e03de167601a7af42f12e6903f2d'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted SearchArtists request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.artist.search('sdfasfasd34wes').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'SearchArtists',
                Session: 'SessionKey',
                String: 'sdfasfasd34wes',
                Signature: '42c7e9af966fc5793b9d159c5a75566a'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('album', function() {
        it('should submit a correctly-formatted GetAlbums request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.album.getAll().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetAlbums',
                Session: 'SessionKey',
                Signature: '852a236f9dc8d3eeb682b3054a35bea0'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted GetAlbumsByArtist request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.album.getFromArtist(12364).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetAlbumsByArtist',
                Session: 'SessionKey',
                ID: 12364,
                Signature: '7f430d40bbb0b196fb2722bf9226534b'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted SearchAlbums request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.album.search('asdfs08h8s7dhf8h').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'SearchAlbums',
                Session: 'SessionKey',
                String: 'asdfs08h8s7dhf8h',
                Signature: 'c48181ebc6c1cec0c5507db46eea5af0'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('track', function() {
        it('should submit a correctly-formatted GetTracks request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.getAll().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetTracks',
                Session: 'SessionKey',
                Signature: '9cd9745f73d2108eca1473f30a690445'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted GetTracksByArtist request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.getFromArtist(35326).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetTracksByArtist',
                Session: 'SessionKey',
                ID: 35326,
                Signature: '65327783655927dc7580c1c329e3ecf3'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted GetTracksByAlbum request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.getFromAlbum(12486).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetTracksByAlbum',
                Session: 'SessionKey',
                ID: 12486,
                Signature: 'acdaf279a09e9deaea0bcc348c700ec1'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted ConvertTrackByID request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.convert('dfjdhfsjkfsbkdhfbuiy').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'ConvertTrackByID',
                Session: 'SessionKey',
                String: 'dfjdhfsjkfsbkdhfbuiy',
                Signature: 'aa438b284e587caab0120fe62523a0b7'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted LFMNowPlayingTrack request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.lastFMNowPlaying('sdf9basd8yfhio').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'LFMNowPlayingTrack',
                Session: 'SessionKey',
                String: 'sdf9basd8yfhio',
                Signature: '70939d28715047cdaa18c8dd7ebae9df'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted LFMScrobbleTrack request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.lastFMScrobble('sdfg87s6dgf7sgyui').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'LFMScrobbleTrack',
                Session: 'SessionKey',
                String: 'sdfg87s6dgf7sgyui',
                Signature: 'f58892cf47c44d128cc45ba6f6c5412c'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted SearchTracks request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.track.search('asdfas8bfsiaufb').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'SearchTracks',
                Session: 'SessionKey',
                String: 'asdfas8bfsiaufb',
                Signature: '7b265b3a7b49e14b6d832d06b349b5fb'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('session', function() {
        it('should submit a correctly-formatted GetToken request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.session.getToken().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetToken',
                Signature: '7a60187550fce5fd85929b245077fe20'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted GetSession request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.session.getSession('asdfisbdf9sd80s9di0', 'sd89f7ah9s8d7gh0as9jidojd').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetSession',
                Token: 'asdfisbdf9sd80s9di0',
                Authentication: 'sd89f7ah9s8d7gh0as9jidojd',
                Signature: '9307b9d7cda2b8d5446f171393527d23'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });

        it('should submit a correctly-formatted GetUserPreferences request', function() {
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/api').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.session.getUserPreferences().submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'GetUserPreferences',
                Session: 'SessionKey',
                Signature: '679b9978ae9764f5fc5185ecbf258ad9'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });
});

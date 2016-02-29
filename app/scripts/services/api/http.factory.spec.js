/* jshint -W117, -W030 */
describe('app.services.api.HttpFactory', function() {

  var service;
  var sessionKey = 'asdguibasdigbasdfnos';
  var sessionSecret = 'sdgaosdngiuasghiodsajgads';
  var mockResponse = {someKey: 'someValue'};

  function submitRequest(service) {
    service.submit().then(successHandler, errorHandler);
    $httpBackend.flush();
    $rootScope.$digest();
  }

  beforeEach(module('app.services.api'));
  beforeEach(inject(function($injector, $httpBackend, $rootScope, $http, $q) {
    window.$httpBackend = $httpBackend;
    window.$rootScope = $rootScope;
    window.$q = $q;
    window.$http = $http;
    window.successHandler = jasmine.createSpy('successHandler');
    window.errorHandler = jasmine.createSpy('errorHandler');

    var Factory = $injector.get('HttpFactory', {
      $http: $http,
      $q: $q,
      $rootScope: $rootScope,
    });
    service = new Factory('TestCommand', '/testUrl');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('submit', function() {
    it('should return a rejected promise with an error message on a non-401 HTTP response', function() {
      spyOn($rootScope, '$emit');
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Signature: '7c3b450e3d5e6c8ec3f89384d9666882'
      }).respond(404, '');

      submitRequest(service);

      expect(errorHandler).toHaveBeenCalledWith('Error 404 on HTTP request. Command: "TestCommand"');
      expect($rootScope.$emit).not.toHaveBeenCalled();
    });

    it('should return a rejected promise with an error message and emit a ResponseUnauthorised event on a 401 HTTP response', function() {
      spyOn($rootScope, '$emit');
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Signature: '7c3b450e3d5e6c8ec3f89384d9666882'
      }).respond(401, '');

      submitRequest(service);

      expect(errorHandler).toHaveBeenCalledWith('Error 401 on HTTP request. Command: "TestCommand"');
      expect($rootScope.$emit).toHaveBeenCalledWith('ResponseUnauthorised');
    });
  });

  describe('authenticate', function() {
    it('should attatch the session key, and use the session secret to sign the message', function() {
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Session: 'asdguibasdigbasdfnos',
        Signature: '34d92ed2ec754479f047e6f4e24976b3'
      }).respond(200, mockResponse);

      submitRequest(service.authenticate(sessionKey, sessionSecret));

      expect(successHandler).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('bound', function() {
    it('should add Start and Limit parameters to the request when bound is called', function() {
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Session: 'asdguibasdigbasdfnos',
        Start: 1245,
        Limit: 1952,
        Signature: 'b31412ad8dbdd5296293836b493b5776'
      }).respond(200, mockResponse);

      submitRequest(service.authenticate(sessionKey, sessionSecret).bound(1245, 1952));

      expect(successHandler).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('byId', function() {
    it('should add an Id parameter to the request when byId is called', function() {
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Session: 'asdguibasdigbasdfnos',
        ID: 76722,
        Signature: '717c707c5575f0961aaf644d033479da'
      }).respond(200, mockResponse);

      submitRequest(service.authenticate(sessionKey, sessionSecret).byId(76722));

      expect(successHandler).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('byString', function() {
    it('should add a String parameter to the request when byString is called', function() {
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Session: 'asdguibasdigbasdfnos',
        String: 'asdfadgsadgsh87fg7a8sfd79h',
        Signature: 'c03973d1eef7529fb4bf2e5b6cc1dbbe'
      }).respond(200, mockResponse);

      submitRequest(service.authenticate(sessionKey, sessionSecret).byString('asdfadgsadgsh87fg7a8sfd79h'));

      expect(successHandler).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('addParam', function() {
    it('should add a named parameter to the request when addParam is called', function() {
      $httpBackend.expectPOST('/testUrl', {
        Command: 'TestCommand',
        Session: 'asdguibasdigbasdfnos',
        sadfbuy: 'asdgsd98',
        Signature: '820a90c428a576c139715586db02239a'
      }).respond(200, mockResponse);

      submitRequest(service.authenticate(sessionKey, sessionSecret).addParam('sadfbuy', 'asdgsd98'));

      expect(successHandler).toHaveBeenCalledWith(mockResponse);
    });
  });
});

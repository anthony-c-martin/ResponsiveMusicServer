'use strict';

describe('Factory: HttpRequest', function() {

    var service,
        $http,
        $rootScope,
        $httpBackend,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $http = $injector.get('$http');
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');

            var Factory = $injector.get('HttpRequest', {
                $http: $http,
                $q: $q,
                $rootScope: $rootScope,
            });
            service = new Factory('TestCommand', '/testUrl');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('submit', function() {
        it('should return a rejected promise with an error message on a non-401 HTTP response', function() {
            var postedData;
            var errorResult;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [404, {}, {}];
            });

            service.submit().then(function() {

            }, function(message) {
                errorResult = message;
            });
            $httpBackend.flush();
            $rootScope.$digest();

            expect(errorResult).toBe('Error 404 on HTTP request. Command: "TestCommand"');
            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Signature: '7c3b450e3d5e6c8ec3f89384d9666882'
            });
        });

        it('should return a rejected promise with an error message and emit a ResponseUnauthorised event on a 401 HTTP response', function() {
            var postedData;
            var errorResult;
            spyOn($rootScope, '$emit');
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [401, {}, {}];
            });

            service.submit().then(function() {

            }, function(message) {
                errorResult = message;
            });
            $httpBackend.flush();
            $rootScope.$digest();

            expect(errorResult).toBe('Error 401 on HTTP request. Command: "TestCommand"');
            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Signature: '7c3b450e3d5e6c8ec3f89384d9666882'
            });
            expect($rootScope.$emit).toHaveBeenCalledWith('ResponseUnauthorised');
            expect($rootScope.$emit.callCount).toBe(1);
        });
    });

    describe('authenticate', function() {
        it('should attatch the session key, and use the session secret to sign the message', function() {
            var sessionKey = 'asdguibasdigbasdfnos';
            var sessionSecret = 'sdgaosdngiuasghiodsajgads';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.authenticate(sessionKey, sessionSecret).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Session: 'asdguibasdigbasdfnos',
                Signature: '34d92ed2ec754479f047e6f4e24976b3'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('bound', function() {
        it('should add Start and Limit parameters to the request when bound is called', function() {
            var sessionKey = 'asdga8sfsadbifasbfiuyv';
            var sessionSecret = 'asdgasdgsadiuy98sa7v';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.authenticate(sessionKey, sessionSecret).bound(1245, 1952).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Session: 'asdga8sfsadbifasbfiuyv',
                Start: 1245,
                Limit: 1952,
                Signature: 'dfa78fa9e1c2bcb1bb7d508c94e26f3f'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('byId', function() {
        it('should add an Id parameter to the request when byId is called', function() {
            var sessionKey = 'asdgasdkjbisaufboisu';
            var sessionSecret = 'asdgasdgsadiuy98ssdf098ha7v';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.authenticate(sessionKey, sessionSecret).byId(76722).submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Session: 'asdgasdkjbisaufboisu',
                ID: 76722,
                Signature: '87ceeb86f3461b7395824e6b4ea88f56'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('byString', function() {
        it('should add a String parameter to the request when byString is called', function() {
            var sessionKey = 'asdgasdkjbisaufboisu';
            var sessionSecret = 'asdgasdgsadiuy98ssdf098ha7v';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.authenticate(sessionKey, sessionSecret).byString('asdfadgsadgsh87fg7a8sfd79h').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Session: 'asdgasdkjbisaufboisu',
                String: 'asdfadgsadgsh87fg7a8sfd79h',
                Signature: '704e4af6a9f728bf512a548a7f757f83'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });

    describe('addParam', function() {
        it('should add a named parameter to the request when addParam is called', function() {
            var sessionKey = 'asdg9sda7gf98asdgf987g';
            var sessionSecret = 'asdfiusdafv978g9uisbdi';
            var successSpy = jasmine.createSpy('successSpy');
            var mockResponse = {};
            var postedData;
            $httpBackend.whenPOST('/testUrl').respond(function(method, url, data) {
                postedData = data;
                return [200, mockResponse, {}];
            });

            service.authenticate(sessionKey, sessionSecret).addParam('sadfbuy', 'asdgsd98').submit().then(successSpy);
            $httpBackend.flush();
            $rootScope.$digest();

            expect(JSON.parse(postedData)).toEqual({
                Command: 'TestCommand',
                Session: 'asdg9sda7gf98asdgf987g',
                sadfbuy: 'asdgsd98',
                Signature: 'dfa1026e9dd3894e911f2b9d128f3a99'
            });
            expect(successSpy).toHaveBeenCalledWith(mockResponse);
        });
    });
});

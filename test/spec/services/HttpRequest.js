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
            expect(postedData).toBe('{"Command":"TestCommand","Signature":"7c3b450e3d5e6c8ec3f89384d9666882"}');
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
            expect(postedData).toBe('{"Command":"TestCommand","Signature":"7c3b450e3d5e6c8ec3f89384d9666882"}');
            expect($rootScope.$emit).toHaveBeenCalledWith('ResponseUnauthorised');
            expect($rootScope.$emit.callCount).toBe(1);
        });
    });
});

'use strict';

describe('Controller: LoginController', function() {

    // load the controller's module
    beforeEach(module('musicServerApp'));

    var LoginController,
        $scope, $rootScope, HttpRequest, $q;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, _$rootScope_, _$q_, _HttpRequest_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        HttpRequest = _HttpRequest_;

        LoginController = $controller('LoginController', {
            $rootScope: $rootScope,
            $scope: $scope,
            HttpRequest: _HttpRequest_
        });
    }));

    it('should initialise the auth object on start', function() {
        //expect($scope.auth).toBe({});
    });

    it('should emit a loginSuccess event when the login request succeeds', function() {
        spyOn(HttpRequest.session, 'login').andCallFake(function() {
            return $q.when({
                Session: 'asdouas8gs9f9',
                Secret: 'asdgbsa87gs98hfj'
            });
        });
        $scope.auth = {
            username: 'asdfasf98h',
            password: 'asdofuas9fdh'
        };

        spyOn($scope, '$emit');

        $scope.login();
        $scope.$digest();

        expect(HttpRequest.session.login).toHaveBeenCalledWith('asdfasf98h', 'asdofuas9fdh');
        expect(HttpRequest.session.login.callCount).toBe(1);

        expect($scope.$emit).toHaveBeenCalled();
        expect($scope.$emit.callCount).toBe(1);
        expect($scope.$emit.mostRecentCall.args.length).toBe(2);
        expect($scope.$emit.mostRecentCall.args[0]).toBe('loginSuccess');
        expect($scope.$emit.mostRecentCall.args[1].Key).toBe('asdouas8gs9f9');
        expect($scope.$emit.mostRecentCall.args[1].Secret).toBe('asdgbsa87gs98hfj');
    });

    it('should log a console warning and emit an errorDisplay event when the login fails', function() {
        spyOn(HttpRequest.session, 'login').andCallFake(function() {
            return $q.reject('asdfiubsaifydoina');
        });
        spyOn(console, 'warn');
        spyOn($rootScope, '$emit');
        $scope.auth = {
            username: 'asdfasf98h',
            password: 'asdofuas9fdh'
        };

        $scope.login();
        $scope.$digest();

        expect(HttpRequest.session.login).toHaveBeenCalledWith('asdfasf98h', 'asdofuas9fdh');
        expect(HttpRequest.session.login.callCount).toBe(1);

        expect(console.warn).toHaveBeenCalledWith('asdfiubsaifydoina');
        expect(console.warn.callCount).toBe(1);

        expect($rootScope.$emit).toHaveBeenCalledWith('errorDisplay', 'Login attempt failed. Please try again.');
        expect($rootScope.$emit.callCount).toBe(1);
    });
});

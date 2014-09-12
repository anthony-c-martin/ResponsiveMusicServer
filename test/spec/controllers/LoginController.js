'use strict';

describe('Controller: LoginController', function() {

    beforeEach(module('musicServerApp'));

    var LoginController,
        $scope, $rootScope, ApiRequest, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$q_, _ApiRequest_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        ApiRequest = _ApiRequest_;

        LoginController = $controller('LoginController', {
            $rootScope: $rootScope,
            $scope: $scope,
            ApiRequest: _ApiRequest_
        });
    }));

    it('should initialise the auth object on start', function() {
        expect($scope.auth).toEqual({});
    });

    it('should emit a loginSuccess event when the login request succeeds', function() {
        spyOn(ApiRequest.session, 'login').andCallFake(function() {
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

        expect(ApiRequest.session.login).toHaveBeenCalledWith('asdfasf98h', 'asdofuas9fdh');
        expect(ApiRequest.session.login.callCount).toBe(1);

        expect($scope.$emit).toHaveBeenCalled();
        expect($scope.$emit.callCount).toBe(1);
        expect($scope.$emit.mostRecentCall.args.length).toBe(2);
        expect($scope.$emit.mostRecentCall.args[0]).toBe('loginSuccess');
        expect($scope.$emit.mostRecentCall.args[1].Key).toBe('asdouas8gs9f9');
        expect($scope.$emit.mostRecentCall.args[1].Secret).toBe('asdgbsa87gs98hfj');
    });

    it('should log a console warning and emit an errorDisplay event when the login fails', function() {
        spyOn(ApiRequest.session, 'login').andCallFake(function() {
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

        expect(ApiRequest.session.login).toHaveBeenCalledWith('asdfasf98h', 'asdofuas9fdh');
        expect(ApiRequest.session.login.callCount).toBe(1);

        expect(console.warn).toHaveBeenCalledWith('asdfiubsaifydoina');
        expect(console.warn.callCount).toBe(1);

        expect($rootScope.$emit).toHaveBeenCalledWith('errorDisplay', 'Login attempt failed. Please try again.');
        expect($rootScope.$emit.callCount).toBe(1);
    });
});

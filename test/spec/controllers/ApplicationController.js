'use strict';

function getMockMatchMedia() {
    var onDesktopCallback;
    var onPhoneCallback;

    return {
        onDesktop: function(callback) {
            onDesktopCallback = callback;
        },
        testOnDesktop: function(onDesktop) {
            onDesktopCallback({
                matches: onDesktop
            });
        },
        onPhone: function(callback) {
            onPhoneCallback = callback;
        },
        testOnPhone: function(onPhone) {
            onPhoneCallback({
                matches: onPhone
            });
        }
    };
}

describe('Controller: ApplicationController', function() {

    beforeEach(module('musicServerApp'));

    var ApplicationController,
        $rootScope, $scope, $location, mockMatchmedia, SessionData, ApiRequest, $q;

    beforeEach(inject(function($controller, _$rootScope_, _$location_, _$q_, _SessionData_, _ApiRequest_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $q = _$q_;
        ApiRequest = _ApiRequest_;
        mockMatchmedia = getMockMatchMedia();
        SessionData = _SessionData_;

        ApplicationController = $controller('ApplicationController', {
            $scope: $scope,
            $rootScope: $rootScope,
            $location: $location,
            matchmedia: mockMatchmedia,
            SessionData: SessionData,
            ApiRequest: ApiRequest
        });
    }));

    it('should set the isDeskop scope variable when the onDesktop callback function is called', function() {
        $scope.isDesktop = false;

        mockMatchmedia.testOnDesktop(true);
        expect($scope.isDesktop).toBeTruthy();

        mockMatchmedia.testOnDesktop(false);
        expect($scope.isDesktop).toBeFalsy();
    });

    it('should set the isPhone scope variable when the onPhone callback function is called', function() {
        $scope.isPhone = false;

        mockMatchmedia.testOnPhone(true);
        expect($scope.isPhone).toBeTruthy();

        mockMatchmedia.testOnPhone(false);
        expect($scope.isPhone).toBeFalsy();
    });

    it('should prompt when unloading the window if logged in', function() {
        $scope.loggedIn = true;
        expect(window.onbeforeunload()).toBe('Reloading or closing this page will stop playback!');
    });

    it('should not prompt when unloading the window if not logged in', function() {
        $scope.loggedIn = false;
        expect(window.onbeforeunload()).not.toBeDefined();
    });

    it('should update the scope and preferences when toggleScrobblingEnabled is called', function() {
        spyOn(SessionData, 'setUserPreference');

        $scope.scrobblingEnabled = false;
        $scope.toggleScrobblingEnabled();
        expect($scope.scrobblingEnabled).toBeTruthy();
        expect(SessionData.setUserPreference).toHaveBeenCalledWith('ScrobblingEnabled', true);
        expect(SessionData.setUserPreference.callCount).toBe(1);

        $scope.scrobblingEnabled = true;
        $scope.toggleScrobblingEnabled();
        expect($scope.scrobblingEnabled).toBeFalsy();
        expect(SessionData.setUserPreference).toHaveBeenCalledWith('ScrobblingEnabled', false);
        expect(SessionData.setUserPreference.callCount).toBe(2);
    });

    it('should change location on the scope changeLocation event', function() {
        spyOn($location, 'path');
        spyOn($scope, 'verifyLoggedIn');
        $scope.$emit('changeLocation', 'sdaogsdnh9');

        expect($location.path).toHaveBeenCalledWith('sdaogsdnh9');
        expect($location.path.callCount).toBe(1);
        expect($scope.verifyLoggedIn).toHaveBeenCalled();
        expect($scope.verifyLoggedIn.callCount).toBe(1);
    });

    it('should call verifyLoggedIn on the rootScope $locationChangeSuccess event', function() {
        spyOn($scope, 'verifyLoggedIn');
        $rootScope.$emit('$locationChangeSuccess');

        expect($scope.verifyLoggedIn).toHaveBeenCalled();
        expect($scope.verifyLoggedIn.callCount).toBe(1);
    });

    it('should change the title on the rootScope $routeChangeSuccess event', function() {
        $rootScope.title = '';
        $rootScope.$emit('$routeChangeSuccess', {
            title: 'asoduafg8asdfi76t79'
        });

        expect($rootScope.title).toBe('asoduafg8asdfi76t79');
    });

    it('should set the errorMessage scope variable on the rootScope errorDisplay event', function() {
        $scope.errorMessage = '';
        $rootScope.$emit('errorDisplay', 'asduig87gas98f7g8ygiu');

        expect($scope.errorMessage).toBe('asduig87gas98f7g8ygiu');
    });

    it('should clear the errorMessage on the hideDropdowns event', function() {
        $scope.errorMessage = 'asdfuasuydv';
        $rootScope.$emit('hideDropdowns', 'noterror');

        expect($scope.errorMessage).toBe('');
    });

    it('should not clear the errorMessage on the hideDropdowns event with error set', function() {
        $scope.errorMessage = 'asdgkjsbagiaos8';
        $rootScope.$emit('hideDropdowns', 'error');

        expect($scope.errorMessage).toBe('asdgkjsbagiaos8');
    });

    it('should clear the session, display an error, and call verifyLoggedIn on the ResponseUnauthorised event', function() {
        spyOn($rootScope, '$emit').andCallThrough();
        spyOn(SessionData, 'clearSession');
        spyOn($scope, 'verifyLoggedIn');
        $rootScope.$emit('ResponseUnauthorised');

        expect($rootScope.$emit).toHaveBeenCalledWith('errorDisplay', 'Your session has timed out, and you have been logged out.');
        // Set to 2 because I'm calling it to initiate this test
        expect($rootScope.$emit.callCount).toBe(2);
        expect(SessionData.clearSession).toHaveBeenCalled();
        expect(SessionData.clearSession.callCount).toBe(1);
        expect($scope.verifyLoggedIn).toHaveBeenCalled();
        expect($scope.verifyLoggedIn.callCount).toBe(1);
    });

    it('should store session data, redirect the user, and load user preferences on the loginSuccess event', function() {
        var loginSuccessData = { };
        var userPreferencesData = { };
        $scope.loggedIn = false;
        spyOn($location, 'path');
        spyOn(SessionData, 'setSession');
        spyOn(SessionData, 'setUserPreferences');
        spyOn(SessionData, 'getUserPreference').andReturn('asdgsdagu8as7gf');
        spyOn(ApiRequest.session, 'getUserPreferences').andReturn({
            submit: function() {
                return $q.when(userPreferencesData);
            }
        });

        $scope.$emit('loginSuccess', loginSuccessData);

        expect($scope.loggedIn).toBeTruthy();
        expect($location.path).toHaveBeenCalledWith('/music');
        expect(SessionData.setSession).toHaveBeenCalledWith(loginSuccessData);

        expect(ApiRequest.session.getUserPreferences).toHaveBeenCalled();
        expect(ApiRequest.session.getUserPreferences.callCount).toBe(1);

        $scope.$digest();

        expect(SessionData.setUserPreferences).toHaveBeenCalledWith(userPreferencesData);
        expect(SessionData.setUserPreferences.callCount).toBe(1);
        expect(SessionData.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
        expect(SessionData.getUserPreference.callCount).toBe(1);
        expect($scope.scrobblingEnabled).toBe('asdgsdagu8as7gf');
    });

    it('should not redirect the user and load preferences if verifyLoggedIn is called and a session key is set', function() {
        spyOn(SessionData, 'getSession').andReturn({
            Key: 'adbssadf'
        });
        spyOn(SessionData, 'getUserPreference').andReturn(true);
        spyOn($location, 'path').andReturn('/asdfbiuasbfi');

        $scope.verifyLoggedIn();

        expect($scope.loggedIn).toBeTruthy();
        expect(SessionData.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
        expect(SessionData.getUserPreference.callCount).toBe(1);
        expect($scope.scrobblingEnabled).toBeTruthy();

        expect($location.path).toHaveBeenCalledWith();
        expect($location.path.callCount).toBe(1);
    });

    it('should set the scrobblingEnabled scope variable when the verifyLoggedIn function is called', function() {
        spyOn(SessionData, 'getSession').andReturn({
            Key: 'adbssadf'
        });
        spyOn(SessionData, 'getUserPreference').andReturn(false);
        spyOn($location, 'path').andReturn('/asdfbiuasbfi');

        $scope.verifyLoggedIn();

        expect($scope.loggedIn).toBeTruthy();
        expect(SessionData.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
        expect(SessionData.getUserPreference.callCount).toBe(1);
        expect($scope.scrobblingEnabled).toBeFalsy();
    });

    it('should redirect the user to /login if verifyLoggedIn is called and a session key is not set', function() {
        spyOn(SessionData, 'getSession').andReturn({
            Key: null
        });
        spyOn(SessionData, 'getUserPreference').andReturn(true);
        spyOn($location, 'path').andReturn('/asdfbiuasbfi');

        $scope.verifyLoggedIn();

        expect($scope.loggedIn).toBeFalsy();
        expect($location.path).toHaveBeenCalledWith();
        expect($location.path).toHaveBeenCalledWith('/login');
        expect($location.path.callCount).toBe(2);
    });

    it('should clear the session data and not redirect if verifyLoggedIn is called and the location is /login', function() {
        spyOn(SessionData, 'clearSession');
        spyOn(SessionData, 'getSession').andReturn({
            Key: null
        });
        spyOn(SessionData, 'getUserPreference').andReturn(true);
        spyOn($location, 'path').andReturn('/login');

        $scope.verifyLoggedIn();

        expect(SessionData.clearSession).toHaveBeenCalledWith();
        expect(SessionData.clearSession.callCount).toBe(1);
        expect($location.path).toHaveBeenCalledWith();
        expect($location.path.callCount).toBe(1);
    });
});

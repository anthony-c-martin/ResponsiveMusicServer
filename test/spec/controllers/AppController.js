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

describe('Controller: AppController', function() {

    var controller,
        $scope,
        $rootScope,
        $location,
        mockMatchmedia,
        sessionService,
        ApiFactory,
        $q;

    beforeEach(function() {
        module('musicServerApp');

        inject(function($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $scope = $rootScope.$new();
            sessionService = $injector.get('sessionService');
            ApiFactory = $injector.get('ApiFactory');
            mockMatchmedia = getMockMatchMedia();
            var $controller = $injector.get('$controller');

            controller = $controller('AppController', {
                $scope: $scope,
                $rootScope: $rootScope,
                $location: $location,
                matchmedia: mockMatchmedia,
                sessionService: sessionService,
                ApiFactory: ApiFactory
            });
        });
    });

    describe('matchmedia events', function() {
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
    });

    describe('window events', function() {
        it('should prompt when unloading the window if logged in', function() {
            controller.loggedIn = true;
            expect(window.onbeforeunload()).toBe('Reloading or closing this page will stop playback!');
        });

        it('should not prompt when unloading the window if not logged in', function() {
            controller.loggedIn = false;
            expect(window.onbeforeunload()).not.toBeDefined();
        });
    });

    describe('toggleScrobblingEnabled', function() {
        it('should update the scope and preferences when toggleScrobblingEnabled is called', function() {
            spyOn(sessionService, 'setUserPreference');

            controller.scrobblingEnabled = false;
            controller.toggleScrobblingEnabled();
            expect(controller.scrobblingEnabled).toBeTruthy();
            expect(sessionService.setUserPreference).toHaveBeenCalledWith('ScrobblingEnabled', true);
            expect(sessionService.setUserPreference.calls.count()).toBe(1);

            controller.scrobblingEnabled = true;
            controller.toggleScrobblingEnabled();
            expect(controller.scrobblingEnabled).toBeFalsy();
            expect(sessionService.setUserPreference).toHaveBeenCalledWith('ScrobblingEnabled', false);
            expect(sessionService.setUserPreference.calls.count()).toBe(2);
        });
    });

    describe('event handling', function() {
        it('should change location on the rootScope changeLocation event', function() {
            spyOn($location, 'path');
            spyOn(controller, 'verifyLoggedIn');
            $rootScope.$emit('changeLocation', 'sdaogsdnh9');

            expect($location.path).toHaveBeenCalledWith('sdaogsdnh9');
            expect($location.path.calls.count()).toBe(1);
            expect(controller.verifyLoggedIn).toHaveBeenCalled();
            expect(controller.verifyLoggedIn.calls.count()).toBe(1);
        });

        it('should call verifyLoggedIn on the rootScope $locationChangeSuccess event', function() {
            spyOn(controller, 'verifyLoggedIn');
            $rootScope.$emit('$locationChangeSuccess');

            expect(controller.verifyLoggedIn).toHaveBeenCalled();
            expect(controller.verifyLoggedIn.calls.count()).toBe(1);
        });

        it('should change the title on the rootScope $routeChangeSuccess event', function() {
            $rootScope.title = '';
            $rootScope.$emit('$routeChangeSuccess', {
                title: 'asoduafg8asdfi76t79'
            });

            expect($rootScope.title).toBe('asoduafg8asdfi76t79');
        });

        it('should set the errorMessage scope variable on the rootScope errorDisplay event', function() {
            controller.errorMessage = '';
            $rootScope.$emit('errorDisplay', 'asduig87gas98f7g8ygiu');

            expect(controller.errorMessage).toBe('asduig87gas98f7g8ygiu');
        });

        it('should clear the errorMessage on the hideDropdowns event', function() {
            controller.errorMessage = 'asdfuasuydv';
            $rootScope.$emit('hideDropdowns', 'noterror');

            expect(controller.errorMessage).toBe('');
        });

        it('should not clear the errorMessage on the hideDropdowns event with error set', function() {
            controller.errorMessage = 'asdgkjsbagiaos8';
            $rootScope.$emit('hideDropdowns', 'error');

            expect(controller.errorMessage).toBe('asdgkjsbagiaos8');
        });

        it('should clear the session, display an error, and call verifyLoggedIn on the ResponseUnauthorised event', function() {
            spyOn($rootScope, '$emit').and.callThrough();
            spyOn(sessionService, 'clearSession');
            spyOn(controller, 'verifyLoggedIn');
            $rootScope.$emit('ResponseUnauthorised');

            expect($rootScope.$emit).toHaveBeenCalledWith('errorDisplay', 'Your session has timed out, and you have been logged out.');
            // Set to 2 because I'm calling it to initiate this test
            expect($rootScope.$emit.calls.count()).toBe(2);
            expect(sessionService.clearSession).toHaveBeenCalled();
            expect(sessionService.clearSession.calls.count()).toBe(1);
            expect(controller.verifyLoggedIn).toHaveBeenCalled();
            expect(controller.verifyLoggedIn.calls.count()).toBe(1);
        });

        it('should store session data, redirect the user, and load user preferences on the loginSuccess event', function() {
            var loginSuccessData = { };
            var userPreferencesData = { };
            controller.loggedIn = false;
            spyOn($location, 'path');
            spyOn(sessionService, 'setSession');
            spyOn(sessionService, 'setUserPreferences');
            spyOn(sessionService, 'getUserPreference').and.returnValue('asdgsdagu8as7gf');
            spyOn(ApiFactory.session, 'getUserPreferences').and.returnValue({
                submit: function() {
                    return $q.when(userPreferencesData);
                }
            });

            $rootScope.$emit('loginSuccess', loginSuccessData);

            expect(controller.loggedIn).toBeTruthy();
            expect($location.path).toHaveBeenCalledWith('/music');
            expect(sessionService.setSession).toHaveBeenCalledWith(loginSuccessData);

            expect(ApiFactory.session.getUserPreferences).toHaveBeenCalled();
            expect(ApiFactory.session.getUserPreferences.calls.count()).toBe(1);

            $scope.$digest();

            expect(sessionService.setUserPreferences).toHaveBeenCalledWith(userPreferencesData);
            expect(sessionService.setUserPreferences.calls.count()).toBe(1);
            expect(sessionService.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
            expect(sessionService.getUserPreference.calls.count()).toBe(1);
            expect(controller.scrobblingEnabled).toBe('asdgsdagu8as7gf');
        });
    });

    describe('verifyLoggedIn', function() {
        it('should not redirect the user and load preferences if verifyLoggedIn is called and a session key is set', function() {
            spyOn(sessionService, 'getSession').and.returnValue({
                Key: 'adbssadf'
            });
            spyOn(sessionService, 'getUserPreference').and.returnValue(true);
            spyOn($location, 'path').and.returnValue('/asdfbiuasbfi');

            controller.verifyLoggedIn();

            expect(controller.loggedIn).toBeTruthy();
            expect(sessionService.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
            expect(sessionService.getUserPreference.calls.count()).toBe(1);
            expect(controller.scrobblingEnabled).toBeTruthy();

            expect($location.path).toHaveBeenCalledWith();
            expect($location.path.calls.count()).toBe(1);
        });

        it('should set the scrobblingEnabled scope variable when the verifyLoggedIn function is called', function() {
            spyOn(sessionService, 'getSession').and.returnValue({
                Key: 'adbssadf'
            });
            spyOn(sessionService, 'getUserPreference').and.returnValue(false);
            spyOn($location, 'path').and.returnValue('/asdfbiuasbfi');

            controller.verifyLoggedIn();

            expect(controller.loggedIn).toBeTruthy();
            expect(sessionService.getUserPreference).toHaveBeenCalledWith('ScrobblingEnabled');
            expect(sessionService.getUserPreference.calls.count()).toBe(1);
            expect(controller.scrobblingEnabled).toBeFalsy();
        });

        it('should redirect the user to /login if verifyLoggedIn is called and a session key is not set', function() {
            spyOn(sessionService, 'getSession').and.returnValue({
                Key: null
            });
            spyOn(sessionService, 'getUserPreference').and.returnValue(true);
            spyOn($location, 'path').and.returnValue('/asdfbiuasbfi');

            controller.verifyLoggedIn();

            expect(controller.loggedIn).toBeFalsy();
            expect($location.path).toHaveBeenCalledWith();
            expect($location.path).toHaveBeenCalledWith('/login');
            expect($location.path.calls.count()).toBe(2);
        });

        it('should clear the session data and not redirect if verifyLoggedIn is called and the location is /login', function() {
            spyOn(sessionService, 'clearSession');
            spyOn(sessionService, 'getSession').and.returnValue({
                Key: null
            });
            spyOn(sessionService, 'getUserPreference').and.returnValue(true);
            spyOn($location, 'path').and.returnValue('/login');

            controller.verifyLoggedIn();

            expect(sessionService.clearSession).toHaveBeenCalledWith();
            expect(sessionService.clearSession.calls.count()).toBe(1);
            expect($location.path).toHaveBeenCalledWith();
            expect($location.path.calls.count()).toBe(1);
        });

        it('should clear the session data and not redirect if verifyLoggedIn is called and the location path begins with /login/', function() {
            spyOn(sessionService, 'clearSession');
            spyOn(sessionService, 'getSession').and.returnValue({
                Key: null
            });
            spyOn(sessionService, 'getUserPreference').and.returnValue(true);
            spyOn($location, 'path').and.returnValue('/login/asdf/sadg');

            controller.verifyLoggedIn();

            expect(sessionService.clearSession).toHaveBeenCalledWith();
            expect(sessionService.clearSession.calls.count()).toBe(1);
            expect($location.path).toHaveBeenCalledWith();
            expect($location.path.calls.count()).toBe(1);
        });
    });
});

/* jshint -W117, -W030 */
describe('app.core.AppController', function() {

    var controller;

    beforeEach(module('app.core'));
    beforeEach(inject(function($controller, $q, $rootScope, $state, sessionService, ApiFactory) {
        window.mockMatchmedia = getMockMatchMedia();
        window.$q = $q;
        window.$rootScope = $rootScope;
        window.$state = $state;
        window.sessionService = sessionService;
        window.ApiFactory = ApiFactory;
        window.$scope = $rootScope.$new();

        controller = $controller('AppController', {
            $scope: $scope,
            $rootScope: $rootScope,
            $state: $state,
            matchmedia: mockMatchmedia,
            sessionService: sessionService,
            ApiFactory: ApiFactory
        });
    }));

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

    describe('event: onbeforeunload', function() {
        it('should prompt when unloading the window if logged in', function() {
            spyOn(sessionService, 'hasSession').and.returnValue(true);

            expect(window.onbeforeunload()).toBe('Reloading or closing this page will stop playback!');
        });

        it('should not prompt when unloading the window if not logged in', function() {
            spyOn(sessionService, 'hasSession').and.returnValue(false);

            expect(window.onbeforeunload()).not.toBeDefined();
        });
    });

    describe('event: loginSuccess', function() {
        it('should store session data, redirect the user, and load user preferences on the loginSuccess event', function() {
            spyOn($state, 'go');
            spyOn(ApiFactory.session, 'getUserPreferences').and.returnValue($q.when({
                ScrobblingEnabled: 1
            }));
            spyOn(sessionService, 'setSession');
            spyOn(sessionService, 'setUserPreferences');

            $rootScope.$emit('loginSuccess', {
                Key: 'asd9fhasdfuhi',
                Secret: 'asdufiasubfi9lkna'
            });
            $rootScope.$digest();

            expect($state.go).toHaveBeenCalledWith('music');
            expect(sessionService.setSession).toHaveBeenCalledWith({
                Key: 'asd9fhasdfuhi',
                Secret: 'asdufiasubfi9lkna'
            });
            expect(sessionService.setUserPreferences).toHaveBeenCalledWith({
                ScrobblingEnabled: 1
            });
        });
    });

    describe('event: ResponseUnauthorised', function() {
        it('should emit an error, and redirect the user to the login page', function() {
            spyOn($state, 'go');
            spyOn($rootScope, '$emit').and.callThrough();

            $rootScope.$emit('ResponseUnauthorised');

            expect($rootScope.$emit).toHaveBeenCalledWith('app.components.error.ErrorMessage', jasmine.anything());
            expect($state.go).toHaveBeenCalledWith('login');
        });
    });

    describe('event: $stateChangeStart', function() {
        it('should clear the session on entering the login state', function() {
            spyOn(sessionService, 'clearSession');

            $rootScope.$emit('$stateChangeStart', {name: 'login'});

            expect(sessionService.clearSession).toHaveBeenCalled();
        });

        it('should cancel the state change and set the state to login if the user has no session', function() {
            spyOn(sessionService, 'hasSession').and.returnValue(false);
            spyOn($state, 'go');

            var event = $rootScope.$emit('$stateChangeStart', {name: 'someRandomState'});

            expect($state.go).toHaveBeenCalledWith('login');
            expect(event.defaultPrevented).toBeTruthy();
        });

        it('should allow the state change if the user has a session', function() {
            spyOn(sessionService, 'hasSession').and.returnValue(true);
            spyOn($state, 'go');

            var event = $rootScope.$emit('$stateChangeStart', {name: 'someRandomState'});

            expect($state.go).not.toHaveBeenCalled();
            expect(event.defaultPrevented).toBeFalsy();
        });
    });

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
});

'use strict';

angular.module('musicServerApp')
    .controller('AppController', ['$scope', '$rootScope', '$location', 'matchmedia', 'sessionService', 'apiService',
        function ($scope, $rootScope, $location, matchmedia, sessionService, apiService) {
            var ctrl = this;

            matchmedia.onDesktop(function(mql) {
                $scope.isDesktop = mql.matches;
            });

            matchmedia.onPhone(function(mql) {
                $scope.isPhone = mql.matches;
            });

            var loginRegex = /^\/login($|\/)/;
            function verifyLoggedIn() {
                var currentPath = $location.path();
                if (currentPath.match(loginRegex)) {
                    sessionService.clearSession();
                }

                ctrl.loggedIn = !!sessionService.getSession().Key;

                if (!ctrl.loggedIn && !currentPath.match(loginRegex)) {
                    $location.path('/login');
                }
                ctrl.scrobblingEnabled = sessionService.getUserPreference('ScrobblingEnabled');
            }

            function toggleScrobblingEnabled() {
                ctrl.scrobblingEnabled = !ctrl.scrobblingEnabled;
                sessionService.setUserPreference('ScrobblingEnabled', ctrl.scrobblingEnabled);
            }

            function onBeforeUnload() {
                if (ctrl.loggedIn && !window.LiveReload) {
                    return 'Reloading or closing this page will stop playback!';
                }
            }

            function onChangeLocation(event, newLocation) {
                $location.path(newLocation);
                ctrl.verifyLoggedIn();
            }

            function onLoginSuccess (event, sessionData) {
                sessionService.setSession(sessionData);
                ctrl.loggedIn = true;
                $location.path('/music');
                apiService.session.getUserPreferences().submit().then(function(data) {
                    sessionService.setUserPreferences(data);
                    ctrl.scrobblingEnabled = sessionService.getUserPreference('ScrobblingEnabled');
                });
            }

            function onLocationChangeSuccess() {
                ctrl.verifyLoggedIn();
            }

            function onRouteChangeSuccess(event, currentRoute) {
                $rootScope.title = currentRoute.title;
            }

            function onResponseUnauthorised() {
                $rootScope.$emit('errorDisplay', 'Your session has timed out, and you have been logged out.');
                sessionService.clearSession();
                ctrl.verifyLoggedIn();
            }

            function onHideDropdowns(e, data) {
                if (!(data && data === 'error')) {
                    ctrl.errorMessage = '';
                }
            }

            function onErrorDisplay(e, errorMessage) {
                ctrl.errorMessage = errorMessage;
            }

            window.onbeforeunload = onBeforeUnload;

            $rootScope.$on('changeLocation', onChangeLocation);
            $rootScope.$on('loginSuccess', onLoginSuccess);
            $rootScope.$on('$locationChangeSuccess', onLocationChangeSuccess);
            $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);
            $rootScope.$on('ResponseUnauthorised', onResponseUnauthorised);
            $rootScope.$on('hideDropdowns', onHideDropdowns);
            $rootScope.$on('errorDisplay', onErrorDisplay);

            angular.extend(this, {
                errorMessage: '',
                loggedIn: false,
                scrobblingEnabled: false,
                verifyLoggedIn: verifyLoggedIn,
                toggleScrobblingEnabled: toggleScrobblingEnabled
            });

            ctrl.verifyLoggedIn();
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('AppController', ['$scope', '$rootScope', '$location', 'matchmedia', 'SessionData', 'ApiRequest',
        function ($scope, $rootScope, $location, matchmedia, SessionData, ApiRequest) {
            var ctrl = this;

            matchmedia.onDesktop(function(mql) {
                $scope.isDesktop = mql.matches;
            });

            matchmedia.onPhone(function(mql) {
                $scope.isPhone = mql.matches;
            });

            function verifyLoggedIn() {
                var currentPath = $location.path();
                if (currentPath === '/login') {
                    SessionData.clearSession();
                }

                ctrl.loggedIn = !!SessionData.getSession().Key;

                if (!ctrl.loggedIn && currentPath !== '/login') {
                    $location.path('/login');
                }
                ctrl.scrobblingEnabled = SessionData.getUserPreference('ScrobblingEnabled');
            }

            function toggleScrobblingEnabled() {
                ctrl.scrobblingEnabled = !ctrl.scrobblingEnabled;
                SessionData.setUserPreference('ScrobblingEnabled', ctrl.scrobblingEnabled);
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
                SessionData.setSession(sessionData);
                ctrl.loggedIn = true;
                $location.path('/music');
                ApiRequest.session.getUserPreferences().submit().then(function(data) {
                    SessionData.setUserPreferences(data);
                    ctrl.scrobblingEnabled = SessionData.getUserPreference('ScrobblingEnabled');
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
                SessionData.clearSession();
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

            $scope.$on('changeLocation', onChangeLocation);
            $scope.$on('loginSuccess', onLoginSuccess);
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

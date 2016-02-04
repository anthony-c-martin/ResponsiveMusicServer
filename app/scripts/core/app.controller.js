(function() {
    'use strict';

    angular.module('app.core')
        .controller('AppController', AppController);

    /* @ngInject */
    function AppController($scope, $rootScope, $state, matchmedia, sessionService, ApiFactory) {
        var ctrl = this;

        matchmedia.onDesktop(function(mql) {
            $scope.isDesktop = mql.matches;
        });

        matchmedia.onPhone(function(mql) {
            $scope.isPhone = mql.matches;
        });

        function onBeforeUnload() {
            if (ctrl.loggedIn && !window.LiveReload) {
                return 'Reloading or closing this page will stop playback!';
            }
        }

        function onLoginSuccess(event, sessionData) {
            sessionService.setSession(sessionData);
            $state.go('music');
            ApiFactory.session.getUserPreferences().submit().then(function(data) {
                sessionService.setUserPreferences(data);
            });
        }

        function onResponseUnauthorised() {
            $rootScope.$emit('app.components.error.ErrorMessage', 'Your session has timed out, and you have been logged out.');
            $state.go('login');
        }

        function onStateChangeStart(event, toState) {
            if (toState.name === 'login') {
                sessionService.clearSession();
            } else if (!sessionService.hasSession()) {
                event.preventDefault();
                $state.go('login');
            }
        }

        function isLoggedIn() {
            return sessionService.hasSession();
        }

        window.onbeforeunload = onBeforeUnload;

        $rootScope.$on('loginSuccess', onLoginSuccess);
        $rootScope.$on('ResponseUnauthorised', onResponseUnauthorised);
        $rootScope.$on('$stateChangeStart', onStateChangeStart);

        angular.extend(this, {
            errorMessage: '',
            isLoggedIn: isLoggedIn
        });

        if (!sessionService.hasSession() && !$state.includes('login')) {
            $state.go('login');
        }
    }
})();

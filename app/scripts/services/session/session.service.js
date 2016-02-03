(function() {
    'use strict';

    angular.module('app.services.session')
        .service('sessionService', sessionService);

    /* @ngInject */
    function sessionService($window) {
        /* jshint validthis: true */

        function setSession(newSession) {
            $window.sessionStorage.sessionKey = newSession.Key;
            $window.sessionStorage.sessionSecret = newSession.Secret;
        }

        function getSession() {
            if ($window.sessionStorage !== undefined &&
                $window.sessionStorage.sessionKey && $window.sessionStorage.sessionSecret) {
                return {
                    Key: $window.sessionStorage.sessionKey,
                    Secret: $window.sessionStorage.sessionSecret
                };
            }
            return {
                Key: '',
                Secret: ''
            };
        }

        function hasSession() {
            var session = getSession();
            return !!(session && session.Key && session.Secret);
        }

        function clearSession() {
            delete $window.sessionStorage.sessionKey;
            delete $window.sessionStorage.sessionSecret;
            delete $window.sessionStorage.userPreferences;
        }

        function setUserPreferences(userPreferences) {
            $window.sessionStorage.userPreferences = JSON.stringify(userPreferences);
        }

        function setUserPreference(key, value) {
            var prefs = getUserPreferences();
            prefs[key] = value;
            setUserPreferences(prefs);
        }

        function getUserPreferences() {
            if ($window.sessionStorage.userPreferences) {
                return JSON.parse($window.sessionStorage.userPreferences);
            }
            return {};
        }

        function getUserPreference(key) {
            var prefs = getUserPreferences();
            return prefs[key];
        }

        angular.extend(this, {
            jsonURL: '/api',
            setSession: setSession,
            getSession: getSession,
            hasSession: hasSession,
            clearSession: clearSession,
            setUserPreferences: setUserPreferences,
            setUserPreference: setUserPreference,
            getUserPreferences: getUserPreferences,
            getUserPreference: getUserPreference
        });
    }
})();

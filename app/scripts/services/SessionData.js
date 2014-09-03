'use strict';

angular.module('musicServerApp')
    .factory('SessionData', ['$window',
        function ($window) {
            return {
                setSession: function(newSession) {
                    $window.sessionStorage.sessionKey = newSession.Key;
                    $window.sessionStorage.sessionSecret = newSession.Secret;
                },
                getSession: function() {
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
                },
                clearSession: function() {
                    delete $window.sessionStorage.sessionKey;
                    delete $window.sessionStorage.sessionSecret;
                    delete $window.sessionStorage.userPreferences;
                },
                setUserPreferences: function(userPreferences) {
                    $window.sessionStorage.userPreferences = JSON.stringify(userPreferences);
                },
                setUserPreference: function(key, value) {
                    var prefs = this.getUserPreferences();
                    prefs[key] = value;
                    this.setUserPreferences(prefs);
                },
                getUserPreferences: function() {
                    if ($window.sessionStorage.userPreferences) {
                        return JSON.parse($window.sessionStorage.userPreferences);
                    }
                    return {};
                },
                getUserPreference: function(key) {
                    var prefs = this.getUserPreferences();
                    return prefs[key];
                },
                jsonURL: '/api',
                commands: {
                    GetTrackByID: 'GetTrackByID',
                    GetTracks: 'GetTracks',
                    GetAlbums: 'GetAlbums',
                    GetArtists: 'GetArtists',
                    SearchTracks: 'SearchTracks',
                    SearchAlbums: 'SearchAlbums',
                    SearchArtists: 'SearchArtists',
                    GetTracksByArtist: 'GetTracksByArtist',
                    GetTracksByAlbum: 'GetTracksByAlbum',
                    GetAlbumsByArtist: 'GetAlbumsByArtist',
                    GetToken: 'GetToken',
                    GetSession: 'GetSession',
                    ConvertTrackByID: 'ConvertTrackByID',
                    LFMNowPlayingTrack: 'LFMNowPlayingTrack',
                    LFMScrobbleTrack: 'LFMScrobbleTrack',
                    GetUserPreferences: 'GetUserPreferences'
                }
            };
        }]);
(function() {
    'use strict';

    angular.module('app.services.api')
        .service('apiFactory', apiFactory);

    /* @ngInject */
    function apiFactory(httpFactory, sessionService) {
        function authRequest(command) {
            var session = sessionService.getSession();

            return unauthRequest(command).authenticate(session.Key, session.Secret);
        }

        function unauthRequest(command) {
            var url = sessionService.jsonURL;

            return httpFactory(command, url);
        }

        return {
            artist: {
                getAll: function() {
                    return authRequest('GetArtists');
                },
                search: function(string) {
                    return authRequest('SearchArtists').byString(string);
                }
            },
            album: {
                getAll: function() {
                    return authRequest('GetAlbums');
                },
                getFromArtist: function(id) {
                    return authRequest('GetAlbumsByArtist').byId(id);
                },
                search: function(string) {
                    return authRequest('SearchAlbums').byString(string);
                }
            },
            track: {
                getAll: function() {
                    return authRequest('GetTracks');
                },
                getFromArtist: function(id) {
                    return authRequest('GetTracksByArtist').byId(id);
                },
                getFromAlbum: function(id) {
                    return authRequest('GetTracksByAlbum').byId(id);
                },
                convert: function(string) {
                    return authRequest('ConvertTrackByID').byString(string);
                },
                lastFMNowPlaying: function(string) {
                    return authRequest('LFMNowPlayingTrack').byString(string);
                },
                lastFMScrobble: function(string) {
                    return authRequest('LFMScrobbleTrack').byString(string);
                },
                search: function(string) {
                    return authRequest('SearchTracks').byString(string);
                }
            },
            session: {
                getToken: function() {
                    return unauthRequest('GetToken');
                },
                getSession: function(token, authentication) {
                    return unauthRequest('GetSession').addParam('Token', token)
                        .addParam('Authentication', authentication);
                },
                getUserPreferences: function() {
                    return authRequest('GetUserPreferences');
                }
            }
        };
    }
})();

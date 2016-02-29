(function() {
  'use strict';

  angular.module('app.services.api')
    .service('ApiFactory', ApiFactory);

  /* @ngInject */
  function ApiFactory(HttpFactory, sessionService) {
    function apiAuthedRequest(command) {
      var session = sessionService.getSession();

      return apiRequest(command).authenticate(session.Key, session.Secret);
    }

    function apiRequest(command) {
      var url = sessionService.jsonURL;

      return new HttpFactory(command, url);
    }

    return {
      artist: {
        getAll: function(start, limit) {
          return apiAuthedRequest('GetArtists').bound(start, limit).submit();
        },
        search: function(string, start, limit) {
          return apiAuthedRequest('SearchArtists').byString(string).bound(start, limit).submit();
        }
      },
      album: {
        getAll: function(start, limit) {
          return apiAuthedRequest('GetAlbums').bound(start, limit).submit();
        },
        getFromArtist: function(artistId, start, limit) {
          return apiAuthedRequest('GetAlbumsByArtist').byId(artistId).bound(start, limit).submit();
        },
        search: function(string, start, limit) {
          return apiAuthedRequest('SearchAlbums').byString(string).bound(start, limit).submit();
        }
      },
      track: {
        getAll: function(start, limit) {
          return apiAuthedRequest('GetTracks').bound(start, limit).submit();
        },
        getFromArtist: function(id, start, limit) {
          return apiAuthedRequest('GetTracksByArtist').byId(id).bound(start, limit).submit();
        },
        getFromAlbum: function(albumId, start, limit) {
          return apiAuthedRequest('GetTracksByAlbum').byId(albumId).bound(start, limit).submit();
        },
        convert: function(string) {
          return apiAuthedRequest('ConvertTrackByID').byString(string).submit();
        },
        lastFMNowPlaying: function(string) {
          return apiAuthedRequest('LFMNowPlayingTrack').byString(string).submit();
        },
        lastFMScrobble: function(string) {
          return apiAuthedRequest('LFMScrobbleTrack').byString(string).submit();
        },
        search: function(string, start, limit) {
          return apiAuthedRequest('SearchTracks').byString(string).bound(start, limit).submit();
        }
      },
      session: {
        getToken: function() {
          return apiRequest('GetToken').submit();
        },
        getSession: function(token, authentication) {
          return apiRequest('GetSession').addParam('Token', token).addParam('Authentication', authentication).submit();
        },
        getUserPreferences: function() {
          return apiAuthedRequest('GetUserPreferences').submit();
        }
      }
    };
  }
})();

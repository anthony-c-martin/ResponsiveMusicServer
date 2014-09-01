'use strict';

angular.module('musicServerApp')
    .factory('TrackRequest', ['HttpRequest',
        function(HttpRequest) {
            return {
                getAll: function() {
                    return HttpRequest.fetchAll('GetTracks', true);
                },
                getFromArtist: function(id) {
                    return HttpRequest.fetchByID('GetTracksByArtist', true, id);
                },
                getFromAlbum: function(id) {
                    return HttpRequest.fetchByID('GetTracksByAlbum', true, id);
                },
                search: function(string) {
                    return HttpRequest.fetchByString('SearchTracks', true, string);
                },
                convert: function(id) {
                    return HttpRequest.fetchByString('ConvertTrackByID', false, id);
                },
                lastFMNowPlaying: function(id) {
                    return HttpRequest.fetchByString('LFMNowPlayingTrack', false, id);
                },
                lastFMScrobble: function(id) {
                    return HttpRequest.fetchByString('LFMScrobbleTrack', false, id);
                }
            };
        }
    ]);
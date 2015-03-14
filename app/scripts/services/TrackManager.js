'use strict';

angular.module('musicServerApp')
    .service('TrackManager', ['SessionData', 'TrackTimer', 'ApiRequest',
        function(SessionData, TrackTimer, ApiRequest) {
            var service = this;

            var scrobbleTimer = new TrackTimer();

            service.setupTrackScrobbling = function(track) {
                if (!SessionData.getUserPreference('ScrobblingEnabled')) {
                    scrobbleTimer.cancel();

                    return;
                }

                ApiRequest.track.lastFMNowPlaying(track.ID).submit();

                scrobbleTimer.reset(function() {
                    ApiRequest.track.lastFMScrobble(track.ID).submit();
                }, track.Duration/2 < 240 ? track.Duration/2 : 240);
            };

            service.togglePauseTrackScrobbling = function(pause) {
                if (pause) {
                    scrobbleTimer.pause();
                } else {
                    scrobbleTimer.resume();
                }
            };
        }]);

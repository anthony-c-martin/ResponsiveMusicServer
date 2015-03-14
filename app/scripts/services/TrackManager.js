'use strict';

angular.module('musicServerApp')
    .service('TrackManager', ['$q', 'SessionData', 'TrackTimer', 'ApiRequest',
        function($q, SessionData, TrackTimer, ApiRequest) {
            var scrobbleTimer = new TrackTimer();

            function setupScrobbling(track) {
                if (!SessionData.getUserPreference('ScrobblingEnabled')) {
                    scrobbleTimer.cancel();

                    return;
                }

                ApiRequest.track.lastFMNowPlaying(track.ID).submit();

                scrobbleTimer.reset(function() {
                    ApiRequest.track.lastFMScrobble(track.ID).submit();
                }, track.Duration/2 < 240 ? track.Duration/2 : 240);
            }

            function togglePauseScrobbling(pause) {
                if (pause) {
                    scrobbleTimer.pause();
                } else {
                    scrobbleTimer.resume();
                }
            }

            function startConversion(track) {
                if (track.conversionPromise) {

                    return track.conversionPromise;
                }

                var deferred = $q.defer();
                if (track.FileName) {
                    deferred.resolve(track);

                    return deferred.promise;
                }

                track.conversionPromise = deferred.promise;
                ApiRequest.track.convert(track.ID).submit().then(function(data) {
                    if (data.Result && data.Result === 'Success') {
                        track.FileName = data.FileName;
                        deferred.resolve(track);
                    } else {
                        deferred.reject();
                    }
                    delete track.conversionPromise;
                }, function(message) {
                    console.warn(message);
                    deferred.reject();
                    delete track.conversionPromise;
                });

                return deferred.promise;
            }

            angular.extend(this, {
                setupScrobbling: setupScrobbling,
                togglePauseScrobbling: togglePauseScrobbling,
                startConversion: startConversion
            });
        }]);

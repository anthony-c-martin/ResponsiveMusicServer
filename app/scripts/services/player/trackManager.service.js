(function() {
    'use strict';

    angular.module('app.services.player')
        .service('trackManagerService', trackManagerService);

    /* @ngInject */
    function trackManagerService($q, sessionService, trackTimerService, apiService) {
        var scrobbleTimer = new trackTimerService();

        function setupScrobbling(track) {
            if (!sessionService.getUserPreference('ScrobblingEnabled')) {
                scrobbleTimer.cancel();

                return;
            }

            apiService.track.lastFMNowPlaying(track.ID).submit();

            scrobbleTimer.reset(function() {
                apiService.track.lastFMScrobble(track.ID).submit();
            }, track.Duration/2 < 240 ? track.Duration/2 : 240);
        }

        function togglePauseScrobbling(pause) {
            if (pause) {
                scrobbleTimer.pause();
            } else {
                scrobbleTimer.resume();
            }
        }

        var conversionDeferred;
        function startConversion(track) {
            if (!track) {

                return $q.reject();
            }

            if (track.conversionPromise) {

                return track.conversionPromise;
            }

            if (conversionDeferred) {
                conversionDeferred.reject();
            }

            conversionDeferred = $q.defer();
            if (track.FileName) {
                conversionDeferred.resolve(track);

                return conversionDeferred.promise;
            }

            track.conversionPromise = conversionDeferred.promise;
            apiService.track.convert(track.ID).submit().then(function(data) {
                if (data.Result && data.Result === 'Success') {
                    track.FileName = data.FileName;
                    conversionDeferred.resolve(track);
                } else {
                    conversionDeferred.reject();
                }
            }, function(message) {
                console.warn(message);
                conversionDeferred.reject();
            }).finally(function() {
                delete track.conversionPromise;
            });

            return conversionDeferred.promise;
        }

        angular.extend(this, {
            setupScrobbling: setupScrobbling,
            togglePauseScrobbling: togglePauseScrobbling,
            startConversion: startConversion
        });
    }
})();

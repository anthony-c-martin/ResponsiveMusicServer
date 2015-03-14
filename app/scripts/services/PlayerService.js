'use strict';

angular.module('musicServerApp')
    .service('PlayerService', ['$rootScope', 'PlaylistFactory', 'SessionData', 'TrackManager',
        function($rootScope, PlaylistFactory, SessionData, TrackManager) {
            var playlist = new PlaylistFactory();

            var current = {
                position: 0,
                volume: 0.5,
                isPlaying: false,
                track: null
            };

            function getSourceParams(track) {
                var params = '?FileName=' + encodeURIComponent(track.FileName);
                params += '&Session=' + encodeURIComponent(SessionData.getSession().Key);

                return params;
            }

            function changeTrack(track) {
                if (!(track && track.FileName)) {
                    audioUpdate('', '');
                    current.track = null;

                    return;
                }

                audioUpdate('/stream' + getSourceParams(track), 'audio/mp4');
                current.track = track;

                TrackManager.setupTrackScrobbling(track);
            }

            function nextTrack() {
                if (current.track) {
                    changeTrack(playlist.getRelativeTo(current.track, false));
                } else {
                    changeTrack(playlist.tracks[0]);
                }
            }

            function previousTrack() {
                if (current.track) {
                    changeTrack(playlist.getRelativeTo(current.track, true));
                } else {
                    changeTrack(playlist.tracks[0]);
                }
            }

            function togglePause() {
                $rootScope.$broadcast('PlayerService.togglePause');
            }

            function volumeUpdate(volume) {
                $rootScope.$broadcast('PlayerService.volumeUpdate', volume);
            }

            function positionUpdate(position) {
                $rootScope.$broadcast('PlayerService.positionUpdate', position);
            }

            function audioUpdate(src, type) {
                $rootScope.$broadcast('PlayerService.audioUpdate', {src: src, type: type});
            }

            function trackPaused(paused) {
                TrackManager.togglePauseTrackScrobbling(paused);
            }

            angular.extend(this, {
                playlist: playlist,
                current: current,
                nextTrack: nextTrack,
                previousTrack: previousTrack,
                togglePause: togglePause,
                volumeUpdate: volumeUpdate,
                positionUpdate: positionUpdate,
                trackPaused: trackPaused
            });
        }]);

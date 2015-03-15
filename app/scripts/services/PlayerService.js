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
                if (!track) {
                    audioUpdate('', '');
                    current.track = null;

                    return;
                }

                TrackManager.startConversion(track).then(function() {
                    audioUpdate('/stream' + getSourceParams(track), 'audio/mp4');
                    current.track = track;
                    audioPlay();

                    TrackManager.setupScrobbling(track);
                }, function() {
                    current.track = track;
                    nextTrack();
                });
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

            function audioUpdate(src, type) {
                $rootScope.$emit('PlayerService.audioUpdate', {src: src, type: type});
            }

            function audioPlay() {
                $rootScope.$emit('PlayerService.play');
            }

            function audioPause() {
                $rootScope.$emit('PlayerService.pause');
            }

            function positionUpdate(position) {
                $rootScope.$emit('PlayerService.positionUpdate', position);
            }

            function volumeUpdate(volume) {
                $rootScope.$emit('PlayerService.volumeUpdate', volume);
            }

            var controlHooks = {
                nextTrack: nextTrack,
                previousTrack: previousTrack,
                volumeUpdate: volumeUpdate,
                positionUpdate: positionUpdate,
                togglePause: function() {
                    if (current.isPlaying) {
                        audioPause();
                    } else {
                        audioPlay();
                    }
                }
            };

            var audioHooks = {
                play: function() {
                    TrackManager.togglePauseScrobbling(false);
                    current.isPlaying = true;
                },
                pause: function() {
                    TrackManager.togglePauseScrobbling(true);
                    current.isPlaying = false;
                },
                volumeChange: function(volume) {
                    current.volume = volume;
                },
                positionChange: function(position) {
                    current.position = position;
                },
                ended: function() {
                    controlHooks.nextTrack();
                }
            };

            angular.extend(this, {
                playlist: playlist,
                current: current,
                audioHooks: audioHooks,
                controlHooks: controlHooks
            });
        }]);

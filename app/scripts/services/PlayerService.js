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
                    $rootScope.$emit('PlayerService.audioUpdate', {src: '', type: ''});
                    current.track = null;

                    return;
                }

                TrackManager.startConversion(track).then(function() {
                    $rootScope.$emit('PlayerService.audioUpdate', {src: '/stream' + getSourceParams(track), type: 'audio/mp4'});
                    current.track = track;
                    $rootScope.$emit('PlayerService.play');

                    TrackManager.setupScrobbling(track);
                }, function() {
                    current.track = track;
                    controlHooks.nextTrack();
                });
            }

            function nextTrack() {
                if (current.track) {
                    controlHooks.changeTrack(playlist.getRelativeTo(current.track, false));
                } else {
                    controlHooks.changeTrack(playlist.tracks[0]);
                }
            }

            function previousTrack() {
                if (current.track) {
                    controlHooks.changeTrack(playlist.getRelativeTo(current.track, true));
                } else {
                    controlHooks.changeTrack(playlist.tracks[0]);
                }
            }

            function audioPlay() {
                if (current.track) {
                    $rootScope.$emit('PlayerService.play');
                } else {
                    controlHooks.nextTrack();
                }
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
                changeTrack: changeTrack,
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

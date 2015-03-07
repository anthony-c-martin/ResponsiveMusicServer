'use strict';

angular.module('musicServerApp')
    .service('PlayerService', ['PlaylistFactory', 'SessionData',
        function(PlaylistFactory, SessionData) {
            var service = this;

            this.playlist = new PlaylistFactory();

            function getSourceParams(track) {
                var params = '?FileName=' + encodeURIComponent(track.FileName);
                params += '&Session=' + encodeURIComponent(SessionData.getSession().Key);

                return params;
            }

            function changeTrack(track) {
                if(track && track.FileName) {
                    service.current.src = '/stream' + getSourceParams(track);
                    service.current.type = 'audio/mp4';
                    service.current.track = track;
                } else {
                    service.current.src = '';
                    service.current.type = '';
                    service.current.track = null;
                }
            }

            this.nextTrack = function() {
                if (service.current.track) {
                    changeTrack(service.playlist.getRelativeTo(service.current.track, false));
                } else {
                    changeTrack(service.playlist.tracks[0]);
                }
            };

            this.previousTrack = function() {
                if (service.current.track) {
                    changeTrack(service.playlist.getRelativeTo(service.current.track, true));
                } else {
                    changeTrack(service.playlist.tracks[0]);
                }
            };

            this.volumeUpdate = function(volume) {
                if (service.volumeUpdateCallback) {
                    service.volumeUpdateCallback(volume);
                }
            };
            this.volumeUpdateCallback = null;

            this.positionUpdate = function(position) {
                if (service.positionUpdateCallback) {
                    service.positionUpdateCallback(position);
                }
            };
            this.positionUpdateCallback = null;

            this.current = {
                position: 0,
                volume: 0.5,
                isPlaying: false,
                track: null,
                src: '',
                type: ''
            };
        }]);

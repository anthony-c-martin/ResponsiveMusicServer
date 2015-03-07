'use strict';

angular.module('musicServerApp')
    .service('PlayerService', ['$rootScope', 'PlaylistFactory', 'SessionData',
        function($rootScope, PlaylistFactory, SessionData) {
            var service = this;

            this.playlist = new PlaylistFactory();

            function getSourceParams(track) {
                var params = '?FileName=' + encodeURIComponent(track.FileName);
                params += '&Session=' + encodeURIComponent(SessionData.getSession().Key);

                return params;
            }

            function changeTrack(track) {
                if(track && track.FileName) {
                    audioUpdate('/stream' + getSourceParams(track), 'audio/mp4');
                    service.current.track = track;
                } else {
                    audioUpdate('', '');
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

            this.togglePause = function() {
                $rootScope.$broadcast('PlayerService.togglePause');
            };

            this.volumeUpdate = function(volume) {
                $rootScope.$broadcast('PlayerService.volumeUpdate', volume);
            };

            this.positionUpdate = function(position) {
                $rootScope.$broadcast('PlayerService.positionUpdate', position);
            };

            function audioUpdate(src, type) {
                $rootScope.$broadcast('PlayerService.audioUpdate', {src: src, type: type});
            }

            this.current = {
                position: 0,
                volume: 0.5,
                isPlaying: false,
                track: null
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .service('PlayerService', ['PlaylistFactory',
        function(PlaylistFactory) {
            this.playlist = new PlaylistFactory();
            var currentTrack = null;

            var handlers = {
                trackChange: null,
                playingChange: null,
                volumeChange: null,
                positionChange: null
            };

            function fireEvent(type, data) {
                if (handlers[type]) {
                    handlers[type](data);
                }
            }

            this.on = function(event, handler) {
                if (handlers.hasOwnProperty(event)) {
                    handlers[event] = handler;
                }
            };

            this.nextTrack = function() {
                if (currentTrack) {
                    currentTrack = this.playlist.getRelativeTo(currentTrack, false);
                } else {
                    currentTrack = this.playlist.tracks[0];
                }
                fireEvent('trackChange', currentTrack);
            };

            this.previousTrack = function() {
                if (currentTrack) {
                    currentTrack = this.playlist.getRelativeTo(currentTrack, true);
                } else {
                    currentTrack = this.playlist.tracks[0];
                }
                fireEvent('trackChange', currentTrack);
            };

            this.setPlaying = function(isPlaying) {
                fireEvent('playingChange', isPlaying);
            };

            this.setVolume = function(volume) {
                fireEvent('volumeChange', volume);
            };

            this.setPosition = function(position) {
                fireEvent('positionChange', position);
            };
        }]);

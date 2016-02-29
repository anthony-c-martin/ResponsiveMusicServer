(function () {
  'use strict';

  angular.module('app.services.player')
    .service('playerService', playerService);

  /* @ngInject */
  function playerService($rootScope, $q, PlaylistFactory, sessionService, trackManagerService) {
    /* jshint validthis: true */

    var playlist = new PlaylistFactory();
    var prevPlayedPlaylist = new PlaylistFactory();

    var current = {
      position: 0,
      volume: 0.5,
      isPlaying: false,
      track: null
    };

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
        trackManagerService.togglePauseScrobbling(false);
        current.isPlaying = true;
      },
      pause: function() {
        trackManagerService.togglePauseScrobbling(true);
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

    function getSourceParams(track) {
      var params = '?FileName=' + encodeURIComponent(track.FileName);
      params += '&Session=' + encodeURIComponent(sessionService.getSession().Key);

      return params;
    }

    function changeTrack(track) {
      var deferred = $q.defer();

      if (track) {
        trackManagerService.startConversion(track).then(function() {
          $rootScope.$emit('playerService.playNew', {src: '/stream' + getSourceParams(track), type: 'audio/mp4'});

          trackManagerService.setupScrobbling(track);
          deferred.resolve();
        }, function() {
          $rootScope.$emit('playerService.playNew', {src: '', type: ''});
          deferred.reject();
        });
      } else {
        $rootScope.$emit('playerService.playNew', {src: '', type: ''});
        deferred.resolve();
      }

      return deferred.promise;
    }

    function nextTrack() {
      var newTrack = playlist.tracks[0];

      controlHooks.changeTrack(newTrack)
        .finally(function() {
          playlist.removeTrack(newTrack);
          if (current.track) {
            prevPlayedPlaylist.addTrack(current.track);
          }
          current.track = newTrack;

          trackManagerService.startConversion(playlist.tracks[0]);
        });
    }

    function previousTrack() {
      if (current.track && (current.track.Duration * current.position > 2)) {
        controlHooks.positionUpdate(0);

        return;
      }

      var prevPlaylistLength = prevPlayedPlaylist.tracks.length;

      if (prevPlaylistLength > 0) {
        var lastTrack = prevPlayedPlaylist.tracks[prevPlaylistLength - 1];
        controlHooks.changeTrack(lastTrack)
          .finally(function() {
            prevPlayedPlaylist.removeTrack(lastTrack);
            if (current.track) {
              playlist.addTrack(current.track, 0);
            }
            current.track = lastTrack;
          });
      } else if (current.track) {
        playlist.addTrack(current.track, 0);
        current.track = null;
        controlHooks.changeTrack(null);
      }
    }

    function audioPlay() {
      if (current.track) {
        $rootScope.$emit('playerService.play');
      } else {
        controlHooks.nextTrack();
      }
    }

    function audioPause() {
      $rootScope.$emit('playerService.pause');
    }

    function positionUpdate(position) {
      $rootScope.$emit('playerService.positionUpdate', position);
    }

    function volumeUpdate(volume) {
      $rootScope.$emit('playerService.volumeUpdate', volume);
    }

    angular.extend(this, {
      playlist: playlist,
      current: current,
      audioHooks: audioHooks,
      controlHooks: controlHooks
    });
  }
})();

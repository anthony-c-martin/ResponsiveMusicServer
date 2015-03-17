'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['PlayerService',
        function (PlayerService) {
            var ctrl = this;

            function play() {
                PlayerService.playlist.clear();
                PlayerService.playlist.addTrack(ctrl.track);
                PlayerService.controlHooks.nextTrack();
            }

            function add() {
                PlayerService.playlist.addTrack(ctrl.track);
            }

            function remove() {
                PlayerService.playlist.removeTrack(ctrl.track);
            }

            function select($event) {
                if (ctrl.trackArea) {
                    $event.stopPropagation();
                    ctrl.trackArea.trackSelected(ctrl.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            }

            angular.extend(this, {
                play: play,
                add: add,
                remove: remove,
                select: select
            });
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['playerService',
        function (playerService) {
            var ctrl = this;

            function play() {
                playerService.playlist.clear();
                playerService.playlist.addTrack(ctrl.track);
                playerService.controlHooks.nextTrack();
            }

            function add() {
                playerService.playlist.addTrack(ctrl.track);
            }

            function remove() {
                playerService.playlist.removeTrack(ctrl.track);
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

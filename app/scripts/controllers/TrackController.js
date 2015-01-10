'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope',
        function ($scope) {
            var ctrl = this;

            function play($event) {
                $event.stopPropagation();
                $scope.$emit('playTrack', ctrl.track);
            }

            function add($event) {
                $event.stopPropagation();
                $scope.$emit('addTrack', ctrl.track);
            }

            function remove($event) {
                $event.stopPropagation();
                $scope.$emit('removeTrack', ctrl.track);
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

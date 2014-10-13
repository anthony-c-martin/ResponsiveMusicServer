'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope',
        function ($scope) {
            var ctrl = this;

            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playTrack', ctrl.track);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addTrack', ctrl.track);
            };

            this.remove = function($event) {
                $event.stopPropagation();
                $scope.$emit('removeTrack', ctrl.track);
            };

            this.select = function($event) {
                if (ctrl.trackArea) {
                    $event.stopPropagation();
                    ctrl.trackArea.trackSelected(ctrl.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            };
        }]);

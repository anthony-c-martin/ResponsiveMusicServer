'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope',
        function ($scope) {
            function play($event) {
                $event.stopPropagation();
                $scope.$emit('playTrack', $scope.track);
            }

            function add($event) {
                $event.stopPropagation();
                $scope.$emit('addTrack', $scope.track);
            }

            function remove($event) {
                $event.stopPropagation();
                $scope.$emit('removeTrack', $scope.track);
            }

            function select($event) {
                if ($scope.trackArea) {
                    $event.stopPropagation();
                    $scope.trackArea.trackSelected($scope.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            }

            angular.extend(this, {
                play: play,
                add: add,
                remove: remove,
                select: select
            });
        }]);

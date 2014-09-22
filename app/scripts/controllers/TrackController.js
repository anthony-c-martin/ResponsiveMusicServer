'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope',
        function ($scope) {
            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playTrack', $scope.track);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addTrack', $scope.track);
            };

            this.remove = function($event) {
                $event.stopPropagation();
                $scope.$emit('removeTrack', $scope.track);
            };

            this.select = function($event) {
                if ($scope.trackArea) {
                    $event.stopPropagation();
                    $scope.trackArea.trackSelected($scope.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            };
        }]);

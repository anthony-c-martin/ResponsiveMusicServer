'use strict';

angular.module('musicServerApp')
    .controller('TrackController', ['$scope',
        function ($scope) {
            $scope.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playTrack', $scope.track);
            };

            $scope.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addTrack', $scope.track);
            };

            $scope.remove = function($event) {
                $event.stopPropagation();
                $scope.$emit('removeTrack', $scope.track);
            };

            $scope.select = function($event) {
                if ($scope.trackArea) {
                    $event.stopPropagation();
                    $scope.trackArea.trackSelected($scope.track, $event.shiftKey, ($event.ctrlKey || $event.metaKey));
                }
            };
        }]);

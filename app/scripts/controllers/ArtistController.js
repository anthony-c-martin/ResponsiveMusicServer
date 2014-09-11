'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope',
        function ($scope) {
            $scope.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playArtist', $scope.artist);
            };

            $scope.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addArtist', $scope.artist);
            };

            $scope.select = function() {
                $scope.$emit('selectArtist', $scope.artist);
            };
        }]);

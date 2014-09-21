'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope',
        function ($scope) {
            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playArtist', $scope.artist);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addArtist', $scope.artist);
            };

            this.select = function() {
                $scope.$emit('selectArtist', $scope.artist);
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope',
        function ($scope) {
            var ctrl = this;

            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playArtist', ctrl.artist);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addArtist', ctrl.artist);
            };

            this.select = function() {
                $scope.$emit('selectArtist', ctrl.artist);
            };
        }]);

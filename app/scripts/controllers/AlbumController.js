'use strict';

angular.module('musicServerApp')
    .controller('AlbumController', ['$scope',
        function ($scope) {
            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playAlbum', $scope.album);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addAlbum', $scope.album);
            };

            this.select = function() {
                $scope.$emit('selectAlbum', $scope.album);
            };
        }]);

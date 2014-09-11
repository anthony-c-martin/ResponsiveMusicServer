'use strict';

angular.module('musicServerApp')
    .controller('AlbumController', ['$scope',
        function ($scope) {
            $scope.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playAlbum', $scope.album);
            };

            $scope.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addAlbum', $scope.album);
            };

            $scope.select = function() {
                $scope.$emit('selectAlbum', $scope.album);
            };
        }]);

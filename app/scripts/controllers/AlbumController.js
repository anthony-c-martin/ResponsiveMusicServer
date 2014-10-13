'use strict';

angular.module('musicServerApp')
    .controller('AlbumController', ['$scope',
        function ($scope) {
            var ctrl = this;

            this.play = function($event) {
                $event.stopPropagation();
                $scope.$emit('playAlbum', ctrl.album);
            };

            this.add = function($event) {
                $event.stopPropagation();
                $scope.$emit('addAlbum', ctrl.album);
            };

            this.select = function() {
                $scope.$emit('selectAlbum', ctrl.album);
            };
        }]);

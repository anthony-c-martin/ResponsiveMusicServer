'use strict';

angular.module('musicServerApp')
    .controller('AlbumController', ['$scope',
        function ($scope) {
            var ctrl = this;

            function play($event) {
                $event.stopPropagation();
                $scope.$emit('playAlbum', ctrl.album);
            }

            function add($event) {
                $event.stopPropagation();
                $scope.$emit('addAlbum', ctrl.album);
            }

            function select() {
                $scope.$emit('selectAlbum', ctrl.album);
            }

            angular.extend(this, {
                play: play,
                add: add,
                select: select
            });
        }]);

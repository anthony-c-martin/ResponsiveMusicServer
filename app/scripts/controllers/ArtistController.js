'use strict';

angular.module('musicServerApp')
    .controller('ArtistController', ['$scope',
        function ($scope) {
            var ctrl = this;

            function play($event) {
                $event.stopPropagation();
                $scope.$emit('playArtist', ctrl.artist);
            }

            function add($event) {
                $event.stopPropagation();
                $scope.$emit('addArtist', ctrl.artist);
            }

            function select() {
                $scope.$emit('selectArtist', ctrl.artist);
            }

            angular.extend(this, {
                play: play,
                add: add,
                select: select
            });
        }]);

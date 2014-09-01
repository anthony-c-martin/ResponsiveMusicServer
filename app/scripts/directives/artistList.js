'use strict';

angular.module('musicServerApp')
    .directive('artistList', [
        function () {
            return {
                restrict: 'A',
                controller: 'ArtistListController'
            };
        }]);

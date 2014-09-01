'use strict';

angular.module('musicServerApp')
    .directive('trackList', [
        function () {
            return {
                scope: {
                    tracks: '=trackList',
                    fetchMore: '&'
                },
                restrict: 'A',
                controller: 'TrackListController'
            };
        }]);

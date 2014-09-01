'use strict';

angular.module('musicServerApp')
    .controller('TrackViewController', ['$scope', '$routeParams', 'DataLoader', 'TrackRequest',
        function ($scope, $routeParams, DataLoader, TrackRequest) {
            $scope.tracks = [];

            if ($routeParams.search) {
                $scope.trackRequest = DataLoader.init(TrackRequest.search($routeParams.search), $scope.tracks);
            }
            else {
                $scope.trackRequest = DataLoader.init(TrackRequest.getAll(), $scope.tracks);
            }
        }]);

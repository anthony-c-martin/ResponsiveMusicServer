'use strict';

angular.module('musicServerApp')
    .controller('NavController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.navs = [
                {link: 'tracks', title: 'Tracks'},
                {link: 'artists', title: 'Artists'},
                {link: 'albums', title: 'Albums'}
            ];

            $scope.isActive = function(location) {
                var locationArray = $location.path().split('/');
                if (locationArray.length < 2) {
                    return false;
                }

                return location === locationArray[1];
            };

            $scope.changeLocation = function(newLocation) {
                $scope.$emit('changeLocation', newLocation);
            };
        }]);

'use strict';

angular.module('musicServerApp')
    .directive('bodyEventHandler', ['$rootScope',
        function($rootScope) {
            function linkFunction(scope, element) {
                element.on('click.am', function() {
                    $rootScope.$emit('hideDropdowns');
                });
            }

            return {
                restrict: 'A',
                link: linkFunction
            };
        }
    ]);

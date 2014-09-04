'use strict';

angular.module('musicServerApp')
    .directive('bodyEventHandler', ['$rootScope',
        function($rootScope) {
            function linkFunction(scope, element, attrs) {
                element.on('click.am', function(e) {
                    scope.$apply(function() {
                        if (attrs.bodyEventHandler) {
                            $rootScope.$emit('hideDropdowns', attrs.bodyEventHandler);
                            e.stopPropagation();
                        } else {
                            $rootScope.$emit('hideDropdowns');
                        }
                    });
                });
            }

            return {
                restrict: 'A',
                link: linkFunction
            };
        }
    ]);

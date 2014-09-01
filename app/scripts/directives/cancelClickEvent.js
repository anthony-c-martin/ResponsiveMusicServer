'use strict';

angular.module('musicServerApp')
    .directive('cancelClickEvent', ['$rootScope',
        function() {
            return {
                link: function(scope, element) {
                    element.on('click.am', function(e) {
                        e.stopPropagation();
                    });
                },
                restrict: 'A'
            };
        }]);

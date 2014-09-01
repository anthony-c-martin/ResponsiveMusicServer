'use strict';

angular.module('musicServerApp')
    .filter('groupBy', [
        function() {
            return function(items, group) {
                return items.filter(function(element) {
                    return element.DiscNumber === group;
                });
            };
        }]);

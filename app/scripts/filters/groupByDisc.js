'use strict';

angular.module('musicServerApp')
    .filter('groupByDisc', [
        function() {
            return function(items, group) {
                return items.filter(function(item) {
                    return item.DiscNumber === group;
                });
            };
        }]);

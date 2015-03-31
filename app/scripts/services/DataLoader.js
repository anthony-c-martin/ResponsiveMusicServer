(function() {
    'use strict';

    angular.module('app.services')
        .factory('DataLoader', DataLoader);

    /* @ngInject */
    function DataLoader() {
        return function(request, array, limit) {
            var loadMore = true;
            var currentPos = 0;

            function fetch() {
                if (request && loadMore) {
                    loadMore = false;
                    request.bound(currentPos, limit).submit().then(function(data) {
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i]);
                        }
                        if (data.length > 0) {
                            currentPos += data.length;
                            loadMore = true;
                        }
                    }, function(message) {
                        console.warn(message);
                    });
                }
            }

            angular.extend(this, {
                fetch: fetch
            });
        };
    }
})();

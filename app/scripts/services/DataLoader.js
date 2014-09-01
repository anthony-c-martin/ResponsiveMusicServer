'use strict';

angular.module('musicServerApp')
    .factory('DataLoader', ['$q',
        function ($q) {
            return {
                init: function (request, array) {
                    return {
                        loadMore: true,
                        fetch: function () {
                            var deferred = $q.defer();
                            if (request && this.loadMore) {
                                this.loadMore = false;
                                var _this = this;
                                request.load().then(function (data) {
                                    for (var i = 0; i < data.length; i++) {
                                        array.push(data[i]);
                                    }
                                    if (data.length > 0) {
                                        _this.loadMore = true;
                                    }
                                    deferred.resolve();
                                }, function (message) {
                                    console.warn(message);
                                    deferred.reject();
                                });
                            }
                            else {
                                deferred.reject();
                            }
                            return deferred.promise;
                        }
                    };
                }
            };
        }]);

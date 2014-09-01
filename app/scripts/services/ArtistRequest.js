'use strict';

angular.module('musicServerApp')
    .factory('ArtistRequest', ['HttpRequest',
        function (HttpRequest) {
            return {
                getAll: function () {
                    return HttpRequest.fetchAll('GetArtists', true);
                },
                search: function (string) {
                    return HttpRequest.fetchByString('SearchArtists', true, string);
                }
            };
        }]);

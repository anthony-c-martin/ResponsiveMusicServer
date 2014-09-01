'use strict';

angular.module('musicServerApp')
    .factory('AlbumRequest', ['HttpRequest',
        function (HttpRequest) {
            return {
                getAll: function () {
                    return HttpRequest.fetchAll('GetAlbums', true);
                },
                getFromArtist: function (id) {
                    return HttpRequest.fetchByID('GetAlbumsByArtist', true, id);
                },
                search: function (string) {
                    return HttpRequest.fetchByString('SearchAlbums', true, string);
                }
            };
        }]);

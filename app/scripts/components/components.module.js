System.register(['./album/album.module', './artist/artist.module', './navbar/navbar.module', './playlist/playlist.module', './search/search.module', './track/track.module', './error/error.module', './misc/misc.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var album_module_1, artist_module_1, navbar_module_1, playlist_module_1, search_module_1, track_module_1, error_module_1, misc_module_1;
    return {
        setters:[
            function (album_module_1_1) {
                album_module_1 = album_module_1_1;
            },
            function (artist_module_1_1) {
                artist_module_1 = artist_module_1_1;
            },
            function (navbar_module_1_1) {
                navbar_module_1 = navbar_module_1_1;
            },
            function (playlist_module_1_1) {
                playlist_module_1 = playlist_module_1_1;
            },
            function (search_module_1_1) {
                search_module_1 = search_module_1_1;
            },
            function (track_module_1_1) {
                track_module_1 = track_module_1_1;
            },
            function (error_module_1_1) {
                error_module_1 = error_module_1_1;
            },
            function (misc_module_1_1) {
                misc_module_1 = misc_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.components', [
                album_module_1.default,
                artist_module_1.default,
                navbar_module_1.default,
                playlist_module_1.default,
                search_module_1.default,
                track_module_1.default,
                error_module_1.default,
                misc_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=components.module.js.map
System.register(['./api/api.module', './session/session.module', './player/player.module', './playlist/playlist.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var api_module_1, session_module_1, player_module_1, playlist_module_1;
    return {
        setters:[
            function (api_module_1_1) {
                api_module_1 = api_module_1_1;
            },
            function (session_module_1_1) {
                session_module_1 = session_module_1_1;
            },
            function (player_module_1_1) {
                player_module_1 = player_module_1_1;
            },
            function (playlist_module_1_1) {
                playlist_module_1 = playlist_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.services', [
                api_module_1.default,
                session_module_1.default,
                player_module_1.default,
                playlist_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=services.module.js.map
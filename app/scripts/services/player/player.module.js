System.register(['../../services/api/api.module', '../../services/playlist/playlist.module', '../../services/session/session.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var api_module_1, playlist_module_1, session_module_1;
    return {
        setters:[
            function (api_module_1_1) {
                api_module_1 = api_module_1_1;
            },
            function (playlist_module_1_1) {
                playlist_module_1 = playlist_module_1_1;
            },
            function (session_module_1_1) {
                session_module_1 = session_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.services.player', [
                api_module_1.default,
                playlist_module_1.default,
                session_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=player.module.js.map
System.register(['../../core/core.module', '../../services/player/player.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_module_1, player_module_1;
    return {
        setters:[
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            },
            function (player_module_1_1) {
                player_module_1 = player_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.components.artist', [
                core_module_1.default,
                player_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=artist.module.js.map
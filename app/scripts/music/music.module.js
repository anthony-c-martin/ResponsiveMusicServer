System.register(['../services/player/player.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var player_module_1;
    return {
        setters:[
            function (player_module_1_1) {
                player_module_1 = player_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.music', [
                player_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=music.module.js.map
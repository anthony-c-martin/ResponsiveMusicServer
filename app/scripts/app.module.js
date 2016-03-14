System.register(['./components/components.module', './core/core.module', './services/services.module', './music/music.module', './login/login.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var components_module_1, core_module_1, services_module_1, music_module_1, login_module_1;
    return {
        setters:[
            function (components_module_1_1) {
                components_module_1 = components_module_1_1;
            },
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            },
            function (services_module_1_1) {
                services_module_1 = services_module_1_1;
            },
            function (music_module_1_1) {
                music_module_1 = music_module_1_1;
            },
            function (login_module_1_1) {
                login_module_1 = login_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app', [
                components_module_1.default,
                core_module_1.default,
                services_module_1.default,
                music_module_1.default,
                login_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=app.module.js.map
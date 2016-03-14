System.register(['../../core/core.module', '../../services/api/api.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_module_1, api_module_1;
    return {
        setters:[
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            },
            function (api_module_1_1) {
                api_module_1 = api_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.components.search', [
                core_module_1.default,
                api_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=search.module.js.map
System.register(['../../services/api/api.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var api_module_1;
    return {
        setters:[
            function (api_module_1_1) {
                api_module_1 = api_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.services.playlist', [
                api_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=playlist.module.js.map
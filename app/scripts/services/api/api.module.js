System.register(['../../services/session/session.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var session_module_1;
    return {
        setters:[
            function (session_module_1_1) {
                session_module_1 = session_module_1_1;
            }],
        execute: function() {
            exports_1("default",angular.module('app.services.api', [
                session_module_1.default
            ]));
        }
    }
});
//# sourceMappingURL=api.module.js.map
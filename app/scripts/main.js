System.register(['angular2/platform/browser', './app.component', 'angular2/http', './services/api/api.service', './services/session/session.service', './services/playlist/playlist.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_component_1, http_1, api_service_1, session_service_1, playlist_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (session_service_1_1) {
                session_service_1 = session_service_1_1;
            },
            function (playlist_service_1_1) {
                playlist_service_1 = playlist_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.default, [http_1.HTTP_PROVIDERS, api_service_1.default, session_service_1.default, playlist_service_1.default]);
        }
    }
});
//# sourceMappingURL=main.js.map
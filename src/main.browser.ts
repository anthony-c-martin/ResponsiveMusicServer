import {bootstrap} from 'angular2/platform/browser';
import {hotModuleReplacement} from 'angular2-hmr';

import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

import App from './app/app';
import ErrorService from './app/services/error/error.service';
import SessionService from './app/services/session/session.service';
import PlayerService from './app/services/player/player.service';
import TrackManagerService from './app/services/player/trackmanager.service';
import ApiService from './app/services/api/api.service';

export function main() {
  let APP_PROVIDERS = [
    ErrorService,
    SessionService,
    PlayerService,
    TrackManagerService,
    ApiService
  ];

  return bootstrap(App, [
    ...ENV_PROVIDERS,
    ...PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
  ])
  .catch(err => console.error(err));

}





/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}

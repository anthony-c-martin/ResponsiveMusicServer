// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import ErrorService from './services/error/error.service';
import SessionService from './services/session/session.service';
import PlayerService from './services/player/player.service';
import TrackManagerService from './services/player/trackmanager.service';
import ApiService from './services/api/api.service';

require('!style-loader!css-loader!font-awesome/css/font-awesome.css');

// Application wide providers
export const APP_PROVIDERS = [
  ErrorService,
  SessionService,
  PlayerService,
  TrackManagerService,
  ApiService,
  AppState
];

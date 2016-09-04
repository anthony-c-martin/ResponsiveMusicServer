import PlayerService from './player/player.service';
import TrackManagerService from './player/trackmanager.service';
import SessionService from './session/session.service';
import ErrorService from './error/error.service';
import ApiService from './api/api.service';
import PlaylistService from './playlist/playlist.service';

export default [
  PlayerService,
  TrackManagerService,
  SessionService,
  ErrorService,
  ApiService,
  PlaylistService
];
import api from './api/api.module';
import session from './session/session.module';
import player from './player/player.module';
import playlist from './playlist/playlist.module';

export default angular.module('app.services', [
  api,
  session,
  player,
  playlist
]);

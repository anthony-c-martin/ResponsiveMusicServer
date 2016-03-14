import core from '../../core/core.module';
import api from '../../services/api/api.module';
import player from '../../services/player/player.module';
import playlist from '../../services/playlist/playlist.module';

export default angular.module('app.components.playlist', [
  core,
  api,
  player,
  playlist
]);

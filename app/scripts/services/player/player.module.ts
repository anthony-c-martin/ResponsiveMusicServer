import api from '../../services/api/api.module';
import playlist from '../../services/playlist/playlist.module';
import session from '../../services/session/session.module';

export default angular.module('app.services.player', [
  api,
  playlist,
  session
]);

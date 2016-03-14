import api from '../services/api/api.module';
import session from '../services/session/session.module';
import playlist from '../services/playlist/playlist.module';

export default angular.module('app.core', [
  api,
  session,
  playlist
]);

import album from './album/album.module';
import artist from './artist/artist.module';
import navbar from './navbar/navbar.module';
import playlist from './playlist/playlist.module';
import search from './search/search.module';
import track from './track/track.module';
import error from './error/error.module';
import misc from './misc/misc.module';

export default angular.module('app.components', [
  album,
  artist,
  navbar,
  playlist,
  search,
  track,
  error,
  misc
]);

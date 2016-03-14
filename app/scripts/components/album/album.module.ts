import core from '../../core/core.module';
import player from '../../services/player/player.module';

import AlbumController from './album.controller';

export default angular.module('app.components.album', [
    core,
    player
  ])
  .controller('AlbumController', )

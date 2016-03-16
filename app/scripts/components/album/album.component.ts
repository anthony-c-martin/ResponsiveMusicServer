import {Component} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import IAlbum from './ialbum';

@Component({
  selector: 'am-album',
  templateUrl: 'app/scripts/album/album.html'
})
export default class AlbumComponent {
  album: IAlbum;
  constructor(album: IAlbum) {
    this.album = album;
  }
  play() {
    PlayerService.playlist.clear();
    PlayerService.playlist.addTracksByAlbum(this.album).then(function() {
      PlayerService.controlHooks.nextTrack();
    });
  }
  add() {
    PlayerService.playlist.addTracksByAlbum(this.album);
  }
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

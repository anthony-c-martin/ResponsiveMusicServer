import {Component} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import IArtist from './iartist';

@Component({
  selector: 'am-artist',
  templateUrl: 'app/scripts/artist/artist.html'
})
export default class ArtistComponent {
  artist: IArtist;
  constructor(artist: IArtist) {
    this.artist = artist;
  }
  play() {
    PlayerService.playlist.clear();
    PlayerService.playlist.addTracksByArtist(this.artist).then(function() {
      PlayerService.controlHooks.nextTrack();
    });
  }
  add() {
    PlayerService.playlist.addTracksByArtist(this.artist);
  }
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

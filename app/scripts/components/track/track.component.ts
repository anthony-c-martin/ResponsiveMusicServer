import {Component} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import ITrack from './itrack';

@Component({
  selector: 'am-track',
  templateUrl: 'scripts/track/track.html'
})
export class TrackComponent {
  track: ITrack;
  constructor(track: ITrack) {
    this.track = track;
  }
  play() {
    PlayerService.playlist.clear();
    PlayerService.playlist.addTrack(this.track);
    PlayerService.controlHooks.nextTrack();
  }
  add() {
    PlayerService.playlist.addTrack(this.track);
  }
  remove() {
    PlayerService.playlist.removeTrack(this.track);
  }
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

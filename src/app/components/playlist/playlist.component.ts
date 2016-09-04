import {Component, Input} from '@angular/core'

import ITrack from '../track/itrack'
import PlaylistService from '../../services/playlist/playlist.service'
import TrackComponent from '../track/track.component';

@Component({
  selector: 'am-playlist',
  template: require('./playlist.html'),
  viewProviders: [TrackComponent]
})
export default class PlaylistComponent {
  @Input() visible:boolean;
  selection:ITrack[];
  constructor(public playlistService: PlaylistService) {}
  toggleVisible() {
    this.visible = !this.visible;
  }
}

//TODO: Integrate with Hidedropdown

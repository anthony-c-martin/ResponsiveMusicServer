import {Component, Input} from 'angular2/core'

import ITrack from '../track/itrack'
import PlaylistService from '../../services/playlist/playlist.service'

@Component({
  selector: 'am-playlist',
  template: require('./playlist.html')
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

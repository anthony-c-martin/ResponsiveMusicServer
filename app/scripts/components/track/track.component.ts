import {Component, Input, Output, EventEmitter} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import ITrack from './itrack';

@Component({
  selector: 'am-track',
  templateUrl: 'app/scripts/components/track/track.html'
})
export default class TrackComponent {
  @Output() remove: EventEmitter<ITrack> = new EventEmitter();
  @Output() play: EventEmitter<ITrack> = new EventEmitter();
  @Output() add: EventEmitter<ITrack> = new EventEmitter();
  @Input() track: ITrack;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

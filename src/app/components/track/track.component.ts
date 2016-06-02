import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

import PlayerService from '../../services/player/player.service';
import ITrack from './itrack';

@Component({
  selector: '[am-track]',
  template: require('./track.html'),
  styles: [require('./track.scss')],
  directives: [NgClass]
})
export default class TrackComponent {
  @Output() remove: EventEmitter<ITrack> = new EventEmitter();
  @Output() play: EventEmitter<ITrack> = new EventEmitter();
  @Output() add: EventEmitter<ITrack> = new EventEmitter();
  @Input() track: ITrack;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

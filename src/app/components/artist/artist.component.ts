import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

import PlayerService from '../../services/player/player.service';
import IArtist from './iartist';

@Component({
  selector: '[am-artist]',
  template: require('./artist.html'),
  styles: [require('./artist.scss')],
  directives: [NgClass]
})
export default class ArtistComponent {
  @Output() play: EventEmitter<IArtist> = new EventEmitter();
  @Output() add: EventEmitter<IArtist> = new EventEmitter();
  @Input() artist: IArtist;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

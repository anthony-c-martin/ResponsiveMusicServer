import {Component, Input, Output, EventEmitter} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import IArtist from './iartist';

@Component({
  selector: 'am-artist',
  templateUrl: 'app/scripts/components/artist/artist.html'
})
export default class ArtistComponent {
  @Output() play: EventEmitter<IArtist> = new EventEmitter();
  @Output() add: EventEmitter<IArtist> = new EventEmitter();
  @Input() artist: IArtist;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

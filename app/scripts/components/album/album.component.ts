import {Component, Input, Output, EventEmitter} from 'angular2/core';

import PlayerService from '../../services/player/player.service';
import IAlbum from './ialbum';

@Component({
  selector: 'am-album',
  templateUrl: 'app/scripts/components/album/album.html'
})
export default class AlbumComponent {
  @Output() play: EventEmitter<IAlbum> = new EventEmitter();
  @Output() add: EventEmitter<IAlbum> = new EventEmitter();
  @Input() album: IAlbum;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

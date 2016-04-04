import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';

import PlayerService from '../../services/player/player.service';
import IAlbum from './ialbum';

@Component({
  selector: '[am-album]',
  template: require('./album.html'),
  styles: [require('./album.scss')],
  directives: [NgClass]
})
export default class AlbumComponent {
  @Output() play: EventEmitter<IAlbum> = new EventEmitter();
  @Output() add: EventEmitter<IAlbum> = new EventEmitter();
  @Input() album: IAlbum;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

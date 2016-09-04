import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

import PlayerService from '../../services/player/player.service';
import IAlbum from './ialbum';

@Component({
  selector: '[am-album]',
  template: require('./album.html'),
  styles: [require('./album.scss')],
  viewProviders: [NgClass]
})
export default class AlbumComponent {
  @Output() play: EventEmitter<IAlbum> = new EventEmitter<IAlbum>();
  @Output() add: EventEmitter<IAlbum> = new EventEmitter<IAlbum>();
  @Input() album: IAlbum;
}

//TODO: Integrate with DraggableData
//TODO: Highlight when selected

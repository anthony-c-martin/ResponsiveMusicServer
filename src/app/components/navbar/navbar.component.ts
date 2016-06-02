import {Component} from '@angular/core';
import {NgClass} from '@angular/common';

import PlayerService from '../../services/player/player.service';
import SessionService from '../../services/session/session.service';

@Component({
  selector: 'am-navbar',
  template: require('./navbar.html'),
  styles: [require('./navbar.scss')],
  directives: [NgClass]
})
export default class NavbarComponent {
  constructor(public playerService: PlayerService,
              public sessionService: SessionService) {}
}

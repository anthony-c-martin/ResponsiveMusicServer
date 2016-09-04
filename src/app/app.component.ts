import {Component, ViewEncapsulation} from '@angular/core';

import MusicComponent from './music/music.component';
import LoginComponent from './login/login.component';
import ErrorComponent from './components/error/error.component';
import NavbarComponent from './components/navbar/navbar.component';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  styles: [
    require('./app.scss'),
    require('!raw!../../node_modules/font-awesome/css/font-awesome.css')
  ],
  viewProviders: [NavbarComponent, ErrorComponent],
})
export class App {
}
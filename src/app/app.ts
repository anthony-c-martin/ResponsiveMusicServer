import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import LoginComponent from './login/login.component';

@Component({
  selector: 'app',
  template: require('./app.html'),
  styles: [
    require('!raw!normalize.css'),
    require('./app.scss')
  ],
  directives: [],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true },
  { path: '/login/:auth/:token', name: 'LoginAuto', component: LoginComponent },
//  { path: '/music', name: 'Music', component: MusicComponent },
//  { path: '/music/:artistId', name: 'MusicArtist', component: MusicComponent },
//  { path: '/music/:artistId/:albumId', name: 'MusicAlbum', component: MusicComponent }
//  { path: '/music/:artistId/:albumId', name: 'Music', component: MusicComponent }
//  { path: '/music/search/:searchText', name: 'Search', component: MusicComponent }
])
export default class App {
}

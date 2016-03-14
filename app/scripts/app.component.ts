import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import MusicComponent from './music/music.component';
import LoginComponent from './login/login.component';

@Component({
  selector: 'am-musicserver',
  template: `
    <div>
      <div am-navbar ng-if="appCtrl.isLoggedIn()"></div>
      <div class="container">
        <div class="view-container">
          <router-outlet></router-outlet>
        </div>
        <am-error></am-error>
      </div>
      <div am-drag-image class="drag-image"></div>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
  { path: '/login/:auth/:token', name: 'Login', component: LoginComponent, useAsDefault: true }
])
export class AppComponent {
}

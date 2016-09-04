import { Routes, RouterModule } from '@angular/router';
import MusicComponent from './music/music.component';
import LoginComponent from './login/login.component';
//import { NoContent } from './no-content';

export const ROUTES: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'music',      component: MusicComponent },
  //{ path: '**',    component: NoContent },
];
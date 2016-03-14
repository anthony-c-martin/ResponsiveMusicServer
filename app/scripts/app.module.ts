import components from './components/components.module';
import core from './core/core.module';
import services from './services/services.module';
import music from './music/music.module';
import login from './login/login.module';

export default angular.module('app', [
  components,
  core,
  services,
  music,
  login
]);

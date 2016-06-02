/* jshint -W117, -W030 */
describe('app.services.session.sessionService', function() {

  var service,
    $window,
    $rootScope,
    $q;

  beforeEach(function() {
    module('app.services.session');

    inject(function($injector) {
      $q = $injector.get('$q');
      $window = $injector.get('$window');
      $rootScope = $injector.get('$rootScope');
      service = $injector.get('sessionService', {
        $window: $window
      });
    });
    delete $window.sessionStorage.sessionKey;
    delete $window.sessionStorage.sessionSecret;
    delete $window.sessionStorage.userPreferences;
  });

  describe('Initial data', function() {
    it('should set the jsonURL property', function() {
      expect(service.jsonURL).toBe('/api');
    });
  });

  describe('setSession', function() {
    it('should save the session key and session secret in the session storage', function() {
      service.setSession({
        Key: 'asdfuasg8f7giuhf',
        Secret: 'asdf97gasd8fiusdhoj'
      });

      expect($window.sessionStorage.sessionKey).toBe('asdfuasg8f7giuhf');
      expect($window.sessionStorage.sessionSecret).toBe('asdf97gasd8fiusdhoj');
    });
  });

  describe('getSession', function() {
    it('should retrieve the secret and key from the session storage', function() {
      $window.sessionStorage.sessionKey = 'aasdfsado9fh0sdf7gsdoifhkl';
      $window.sessionStorage.sessionSecret = 'asdfiasd9gfshaoi';

      var session = service.getSession();

      expect(session).toEqual({
        Key: 'aasdfsado9fh0sdf7gsdoifhkl',
        Secret: 'asdfiasd9gfshaoi'
      });
    });

    it('should return an empty secret and key from the session storage if no data is in there', function() {
      var session = service.getSession();

      expect(session).toEqual({
        Key: '',
        Secret: ''
      });
    });
  });

  describe('clearSession', function() {
    it('should empty the session storage when clearSession is called', function() {
      $window.sessionStorage.sesssionKey = 'sadfbsa8dfg7oisahflk';
      $window.sessionStorage.sessionSecret = 'asdgsadi9gbsa87fophoi';
      $window.sessionStorage.userPreferences = 'sadf9a0sg7f9sdpiufh';

      service.clearSession();

      expect($window.sessionStorage.sessionKey).toBeUndefined();
      expect($window.sessionStorage.sessionSecret).toBeUndefined();
      expect($window.sessionStorage.userPreferences).toBeUndefined();
    });
  });

  describe('setUserPreferences', function() {
    it('should set the user preferences objet in the session storage', function() {
      service.setUserPreferences({
        sadfsadfg: 'asdfu9hasd9f8isoajfp'
      });

      expect(JSON.parse($window.sessionStorage.userPreferences)).toEqual({
        sadfsadfg: 'asdfu9hasd9f8isoajfp'
      });
    });
  });

  describe('setUserPreference', function() {
    it('should create a new user preferences object in the session storage if one does not exist', function() {
      delete $window.sessionStorage.userPreferences;

      service.setUserPreference('asdgiasdb9f', 'asdg9uasiuhojasiog');

      expect(JSON.parse($window.sessionStorage.userPreferences)).toEqual({
        asdgiasdb9f: 'asdg9uasiuhojasiog'
      });
    });

    it('should set add to the user preferences object in the session storage', function() {
      service.setUserPreferences({
        asdgiasdbgiu: 'asdgasdiubgsaduif'
      });

      service.setUserPreference('sadpifubsad', 'asdgusabguib');

      expect(JSON.parse($window.sessionStorage.userPreferences)).toEqual({
        asdgiasdbgiu: 'asdgasdiubgsaduif',
        sadpifubsad: 'asdgusabguib'
      });
    });
  });

  describe('getUserPreferences', function() {
    it('should return an empty object if the userPreferences sessionStorage object is not set', function() {
      delete $window.sessionStorage.userPreferences;

      var test = service.getUserPreferences();

      expect(test).toEqual({});
    });

    it('should return the user preferences object if the userPreferences sessionStorage object is set', function() {
      $window.sessionStorage.userPreferences = JSON.stringify({
        asdgiahsd9gh8h: 'asd98fgas9dufbsaoifjns'
      });

      var test = service.getUserPreferences();

      expect(test).toEqual({
        asdgiahsd9gh8h: 'asd98fgas9dufbsaoifjns'
      });
    });
  });

  describe('getUserPreference', function() {
    it('should return undefined if a user preference has not been set', function() {
      delete $window.sessionStorage.userPreferences;

      expect(service.getUserPreference('asdgouiabsd8fg79h')).toBeUndefined();
    });

    it('should retreive a user preference if one has been set', function() {
      $window.sessionStorage.userPreferences = JSON.stringify({
        adg98has9gubdsaiug: 'asdg9abs9gubsaigoj'
      });

      expect(service.getUserPreference('adg98has9gubdsaiug')).toBe('asdg9abs9gubsaigoj');
    });
  });
});

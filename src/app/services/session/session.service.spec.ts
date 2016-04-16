import {
  it,
  inject,
  describe,
  beforeEach,
  beforeEachProviders
} from 'angular2/testing';

import SessionService from './session.service';

describe('SessionService', () => {
  beforeEachProviders(() => [SessionService]);
  beforeEach(inject([SessionService], (sessionService) => {
    this.sessionService = sessionService;
    sessionStorage['sessionKey'] = '0ashf98hasd98f';
    sessionStorage['sessionSecret'] = 'asd8fha9s8dhf98ha';
    sessionStorage['sessionPrefs'] = JSON.stringify({ScrobblingEnabled: true});
  }));

  it('should initialise the apiUrl', () => {
    expect(this.sessionService.apiUrl).toBe('/api');
  });

  it('should write to sessionStorage', () => {
    this.sessionService.set({
      Session: 'asdfasf9h9889h',
      Secret: 'as0df8ha9s8dh'
    });

    expect(sessionStorage['sessionKey']).toEqual('asdfasf9h9889h');
    expect(sessionStorage['sessionSecret']).toEqual('as0df8ha9s8dh');
  });

  it('should read from sessionStorage', () => {
    const session = this.sessionService.get();

    expect(session).toEqual({
      Session: '0ashf98hasd98f',
      Secret: 'asd8fha9s8dhf98ha'
    });
  });

  it('should confirm whether session data is present', () => {
    expect(this.sessionService.exists()).toBeTruthy();

    delete sessionStorage['sessionSecret'];
    expect(this.sessionService.exists()).toBeFalsy();

    delete sessionStorage['sessionKey'];
    sessionStorage['sessionSecret'] = 'asd8fha9s8dhf98ha';
    expect(this.sessionService.exists()).toBeFalsy();
  });

  it('should clear sessionStorage', () => {
    this.sessionService.clear();

    expect(sessionStorage['sessionKey']).not.toBeDefined();
    expect(sessionStorage['sessionSecret']).not.toBeDefined();
    expect(sessionStorage['sessionPrefs']).not.toBeDefined();
  });

  it('should clear sessionStorage and emit loggedOut on unauthorized', (done) => {
    this.sessionService.loggedOut.subscribe(done);

    this.sessionService.unauthorized();

    expect(sessionStorage['sessionKey']).not.toBeDefined();
    expect(sessionStorage['sessionSecret']).not.toBeDefined();
    expect(sessionStorage['sessionPrefs']).not.toBeDefined();
  });

  it('should return user preferences on getPrefs', () => {
    const prefs = this.sessionService.getPrefs();

    expect(prefs).toEqual({
      ScrobblingEnabled: true
    });
  });

  it('should store user preferences as JSON in string form on setPrefs', () => {
    this.sessionService.setPrefs({
      ScrobblingEnabled: false
    });

    expect(sessionStorage['sessionPrefs']).toEqual('{"ScrobblingEnabled":false}');
  });
});

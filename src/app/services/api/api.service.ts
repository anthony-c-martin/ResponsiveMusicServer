import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import SessionService from '../session/session.service';
import HttpRequest from './httprequest';
import {ISuccessResponse, IArtist, IConversionResult, IAlbum, ITrack, ISession, IToken, IUserPreferences} from './api.interfaces';

@Injectable()
export default class ApiService {
  constructor(private _http: Http, private _sessionService: SessionService) {}
  getAllArtists(start: number, limit: number) : Observable<IArtist[]> {
    const request = this._apiRequest('GetArtists').bound(start, limit);
    return this._submit(request, true);
  }
  searchArtists(search: string, start: number, limit: number) : Observable<IArtist[]> {
    const request = this._apiRequest('SearchArtists').byString(search).bound(start, limit);
    return this._submit(request, true);
  }
  getAllAlbums(start: number, limit: number) : Observable<IAlbum[]> {
    const request = this._apiRequest('GetAlbums').bound(start, limit);
    return this._submit(request, true);
  }
  getAlbumsByArtist(artist: IArtist, start: number, limit: number) : Observable<IAlbum[]> {
    const request = this._apiRequest('GetAlbumsByArtist').byId(artist.ID).bound(start, limit);
    return this._submit(request, true);
  }
  searchAlbums(search: string, start: number, limit: number) : Observable<IAlbum[]> {
    const request = this._apiRequest('SearchAlbums').byString(search).bound(start, limit);
    return this._submit(request, true);
  }
  getAllTracks(start: number, limit: number) : Observable<ITrack[]> {
    const request = this._apiRequest('GetTracks').bound(start, limit);
    return this._submit(request, true);
  }
  getTracksByArtist(artist: IArtist, start: number, limit: number) : Observable<ITrack[]> {
    const request = this._apiRequest('GetTracksByArtist').byId(artist.ID).bound(start, limit);
    return this._submit(request, true);
  }
  getTracksByAlbum(album: IAlbum, start: number, limit: number) : Observable<ITrack[]> {
    const request = this._apiRequest('GetTracksByAlbum').byId(album.ID).bound(start, limit);
    return this._submit(request, true);
  }
  convertTrack(track: ITrack) : Observable<IConversionResult> {
    const request = this._apiRequest('ConvertTrackByID').byString(track.ID);
    return this._submit(request, true);
  }
  lastFmNowPlaying(track: ITrack) : Observable<ISuccessResponse> {
    const request = this._apiRequest('LFMNowPlayingTrack').byString(track.ID);
    return this._submit(request, true);
  }
  lastFmScrobble(track: ITrack) : Observable<ISuccessResponse> {
    const request = this._apiRequest('LFMScrobbleTrack').byString(track.ID);
    return this._submit(request, true);
  }
  searchTracks(search: string, start: number, limit: number) : Observable<ITrack[]> {
    const request = this._apiRequest('SearchTracks').byString(search).bound(start, limit);
    return this._submit(request, true);
  }
  getAuthToken() : Observable<IToken> {
    const request = this._apiRequest('GetToken');
    return this._submit(request, false);
  }
  getAuthSession(token: string, auth: string) : Observable<ISession> {
    const request = this._apiRequest('GetSession').addAuth(token, auth);
    return this._submit(request, false);
  }
  getUserPreferences() : Observable<IUserPreferences> {
    const request = this._apiRequest('GetUserPreferences');
    return this._submit(request, true);
  }
  private _apiRequest(command: string) : HttpRequest {
    return new HttpRequest(this._http, this._sessionService, command);
  }
  private _submit(request: HttpRequest, auth: boolean) : Observable<any> {
    const submitted = auth ? request.submitAuth() : request.submitNoAuth();
    return submitted.catch((error) => {
      if (error.status === 401) {
        this._sessionService.unauthorized();
      }
      return Observable.throw('Unexpected HTTP ' + error.status + ' error on request');
    });
  }
}

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import SessionService from '../session/session.service';
import HttpRequest from './httprequest';
import IArtist from '../../components/artist/iartist';
import IAlbum from '../../components/album/ialbum';
import ITrack from '../../components/track/itrack';
import IConversionResult from '../../components/track/iconversionresult';
import ISession from '../session/isession';
import IToken from '../session/itoken';
import {ISuccessResponse} from './isuccessresponse';

@Injectable()
export default class ApiService {
  constructor(private _http: Http, private _sessionService: SessionService) {}
  getAllArtists(start: number, limit: number) : Observable<IArtist[]> {
    const request = this._apiRequest('GetArtists').bound(start, limit);
    return this._submit(request, true);
  }
  searchArtists(search: string, start: number, limit: number) : Observable<IArtist[]> {
    return this._apiRequest('SearchArtists').byString(search).bound(start, limit).submitAuth();
  }
  getAllAlbums(start: number, limit: number) : Observable<IAlbum[]> {
    return this._apiRequest('GetAlbums').bound(start, limit).submitAuth();
  }
  getAlbumsByArtist(artist: IArtist, start: number, limit: number) : Observable<IAlbum[]> {
    return this._apiRequest('GetAlbumsByArtist').byId(artist.ID).bound(start, limit).submitAuth();
  }
  searchAlbums(search: string, start: number, limit: number) : Observable<IAlbum[]> {
    return this._apiRequest('SearchAlbums').byString(search).bound(start, limit).submitAuth();
  }
  getAllTracks(start: number, limit: number) : Observable<ITrack[]> {
    return this._apiRequest('GetTracks').bound(start, limit).submitAuth();
  }
  getTracksByArtist(artist: IArtist, start: number, limit: number) : Observable<ITrack[]> {
    return this._apiRequest('GetTracksByArtist').byId(artist.ID).bound(start, limit).submitAuth();
  }
  getTracksByAlbum(album: IAlbum, start: number, limit: number) : Observable<ITrack[]> {
    return this._apiRequest('GetTracksByAlbum').byId(album.ID).bound(start, limit).submitAuth();
  }
  convertTrack(track: ITrack) : Observable<IConversionResult> {
    return this._apiRequest('ConvertTrackByID').byString(track.ID).submitAuth();
  }
  lastFmNowPlaying(track: ITrack) : Observable<ISuccessResponse> {
    return this._apiRequest('LFMNowPlayingTrack').byString(track.ID).submitAuth();
  }
  lastFmScrobble(track: ITrack) : Observable<ISuccessResponse> {
    return this._apiRequest('LFMScrobbleTrack').byString(track.ID).submitAuth();
  }
  searchTracks(search: string, start: number, limit: number) : Observable<ITrack[]> {
    return this._apiRequest('SearchTracks').byString(search).bound(start, limit).submitAuth();
  }
  getAuthToken() : Observable<IToken> {
    return this._apiRequest('GetToken').submitNoAuth();
  }
  getAuthSession(token: string, auth: string) : Observable<ISession> {
    return this._apiRequest('GetSession').addAuth(token, auth).submitNoAuth();
  }
  getUserPreferences() : Observable<any> {
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

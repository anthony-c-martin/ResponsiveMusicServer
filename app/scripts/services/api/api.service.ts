import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import SessionService from '../session/session.service';
import HttpRequest from './httprequest';
import IArtist from '../../components/artist/iartist';
import IAlbum from '../../components/album/ialbum';
import ITrack from '../../components/track/itrack';
import IConversionResult from '../../components/track/iconversionresult';
import ISession from '../session/isession';
import IToken from '../session/itoken';

@Injectable()
export default class ApiService {
  constructor(private _http: Http, private _sessionService:SessionService) {}
  getAllArtists(start: number, limit: number) : Observable<IArtist[]> {
    return this._apiRequest('GetArtists').bound(start, limit).submitAuth();
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
  lastFmNowPlaying(track: ITrack) : Promise<void> {
    return this._apiRequest('LFMNowPlayingTrack').byString(track.ID).submitAuth().toPromise();
  }
  lastFmScrobble(track: ITrack) : Promise<void> {
    return this._apiRequest('LFMScrobbleTrack').byString(track.ID).submitAuth().toPromise();
  }
  searchTracks(search: string, start: number, limit: number) : Observable<ITrack[]> {
    return this._apiRequest('SearchTracks').byString(search).bound(start, limit).submitAuth();
  }
  getAuthToken() : Promise<IToken> {
    return this._apiRequest('GetToken').submitNoAuth().toPromise();
  }
  getAuthSession(token: string, auth: string) : Promise<ISession> {
    return this._apiRequest('GetSession').addAuth(token, auth).submitNoAuth().toPromise();
  }
  getUserPreferences() : Observable<any> {
    return this._apiRequest('GetUserPreferences').submitAuth();
  }
  private _apiRequest(command: string) : HttpRequest {
    return new HttpRequest(this._http, this._sessionService, command);
  }
}

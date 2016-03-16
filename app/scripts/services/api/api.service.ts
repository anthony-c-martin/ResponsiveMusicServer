import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'

import SessionService from '../session/session.service'
import HttpRequest from './httprequest'
import IArtist from '../../components/artist/iartist'
import IAlbum from '../../components/album/ialbum'
import ITrack from '../../components/track/itrack'

@Injectable()
export default class ApiService {
  constructor(private _http: Http, private _sessionService:SessionService) {}
  getAllArtists(start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetArtists').bound(start, limit).submit(true);
  }
  searchArtists(search:string, start:number, limit:number) : Promise<any> {
    return this._apiRequest('SearchArtists').byString(search).bound(start, limit).submit(true);
  }
  getAllAlbums(start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetAlbums').bound(start, limit).submit(true);
  }
  getAlbumsByArtist(artist:IArtist, start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetAlbumsByArtist').byId(artist.ID).bound(start, limit).submit(true);
  }
  searchAlbums(search:string, start:number, limit:number) : Promise<any> {
    return this._apiRequest('SearchAlbums').byString(search).bound(start, limit).submit(true);
  }
  getAllTracks(start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetTracks').bound(start, limit).submit(true);
  }
  getTracksByArtist(artist:IArtist, start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetTracksByArtist').byId(artist.ID).bound(start, limit).submit(true);
  }
  getTracksByAlbum(album:IAlbum, start:number, limit:number) : Promise<any> {
    return this._apiRequest('GetTracksByAlbum').byId(album.ID).bound(start, limit).submit(true);
  }
  convertTrack(track:ITrack) : Promise<any> {
    return this._apiRequest('ConvertTrackByID').byString(track.ID).submit(true);
  }
  lastFMNowPlaying(track:ITrack) : Promise<any> {
    return this._apiRequest('LFMNowPlayingTrack').byString(track.ID).submit(true);
  }
  lastFMScrobble(track:ITrack) : Promise<any> {
    return this._apiRequest('LFMScrobbleTrack').byString(track.ID).submit(true);
  }
  searchTracks(search:string, start:number, limit:number) : Promise<any> {
    return this._apiRequest('SearchTracks').byString(search).bound(start, limit).submit(true);
  }
  getAuthToken() : Promise<any> {
    return this._apiRequest('GetToken').submit(false);
  }
  getAuthSession(token:string, auth:string) : Promise<any> {
    return this._apiRequest('GetSession').addAuth(token, auth).submit(false);
  }
  getUserPreferences() : Promise<any> {
    return this._apiRequest('GetUserPreferences').submit(true);
  }
  private _apiRequest(command:string) : HttpRequest {
    return new HttpRequest(this._http, this._sessionService, command);
  }
}

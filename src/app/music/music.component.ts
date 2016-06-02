import {Component} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';

import IArtist from '../components/artist/iartist';
import IAlbum from '../components/album/ialbum';
import ITrack from '../components/track/itrack';
import ApiService from '../services/api/api.service';
import SessionService from '../services/session/session.service';
import ErrorService from '../services/error/error.service';
import ScrollLoaderDirective from '../components/misc/scrollLoader.directive';
import ArtistComponent from '../components/artist/artist.component';
import AlbumComponent from '../components/album/album.component';
import TrackComponent from '../components/track/track.component';

@Component({
  selector: 'am-music',
  template: require('./music.html'),
  providers: [ApiService],
  directives: [ScrollLoaderDirective, ArtistComponent, AlbumComponent, TrackComponent]
})
export default class MusicComponent {
  loadArtists: Function = this._loadMoreArtists.bind(this);
  loadAlbums: Function = this._loadMoreAlbums.bind(this);
  loadTracks: Function = this._loadMoreTracks.bind(this);
  private _shouldLoadMoreArtists: boolean = true;
  private _shouldLoadMoreAlbums: boolean = true;
  private _shouldLoadMoreTracks: boolean = true;
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  tracks: ITrack[] = [];
  constructor(private _router: Router,
              private _routeParams: RouteParams,
              private _apiService: ApiService,
              private _errorService: ErrorService,
              private _sessionService: SessionService) {
    this._loadMoreArtists();
    this._sessionService.loggedOut.subscribe((reason) => {
      this._router.navigate(['Login']);
      this._errorService.showError('Your session has timed out, and you have been logged out.');
    });
    this._apiService.getUserPreferences().subscribe(
      (prefs) => {
        this._sessionService.setPrefs(prefs);
      }
    );
  }
  private _loadMoreArtists() {
    if (!this._shouldLoadMoreArtists) {
      return;
    }
    this._shouldLoadMoreArtists = false;
    this._apiService.getAllArtists(this.artists.length, 100).subscribe(
      (artists) => {
        if (artists.length > 0) {
          this._shouldLoadMoreArtists = true;
        }
        while (artists.length > 0) {
          this.artists.push(artists.shift());
        }
      }
    );
  }
  private _loadMoreAlbums() {
    if (!this._shouldLoadMoreAlbums) {
      return;
    }
    this._shouldLoadMoreAlbums = false;
    this._apiService.getAllAlbums(this.albums.length, 100).subscribe(
      (albums) => {
        if (albums.length > 0) {
          this._shouldLoadMoreAlbums = true;
        }
        while (albums.length > 0) {
          this.albums.push(albums.shift());
        }
      }
    );
  }
  private _loadMoreTracks() {
    if (!this._shouldLoadMoreTracks) {
      return;
    }
    this._shouldLoadMoreTracks = false;
    this._apiService.getAllTracks(this.tracks.length, 100).subscribe(
      (tracks) => {
        if (tracks.length > 0) {
          this._shouldLoadMoreTracks = true;
        }
        while (tracks.length > 0) {
          this.tracks.push(tracks.shift());
        }
      }
    );
  }
}

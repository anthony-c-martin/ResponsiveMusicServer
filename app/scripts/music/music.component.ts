import {Component} from 'angular2/core';

import IArtist from '../components/artist/iartist';
import IAlbum from '../components/album/ialbum';
import ITrack from '../components/track/itrack';
import ApiService from '../services/api/api.service';
import ScrollLoaderDirective from '../components/misc/scrollLoader.directive';
import ArtistComponent from '../components/artist/artist.component';
import AlbumComponent from '../components/album/album.component';
import TrackComponent from '../components/track/track.component';

@Component({
  selector: 'am-music',
  templateUrl: 'app/scripts/music/music.html',
  directives: [ScrollLoaderDirective, ArtistComponent, AlbumComponent, TrackComponent]
})
export default class MusicComponent {
  private _shouldLoadMoreArtists: boolean = true;
  private _shouldLoadMoreAlbums: boolean = true;
  private _shouldLoadMoreTracks: boolean = true;
  artists: IArtist[] = [];
  albums: IAlbum[] = [];
  tracks: ITrack[] = [];
  constructor(private _apiService: ApiService) {
    this.loadMoreArtists();
  }
  loadMoreArtists() {
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
  loadMoreAlbums() {
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
  loadMoreTracks() {
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

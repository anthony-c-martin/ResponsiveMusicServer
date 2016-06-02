import {Component} from '@angular/core';
import {Control} from '@angular/common';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import ApiService from '../../services/api/api.service';
import IArtist from '../artist/iartist';
import IAlbum from '../album/ialbum';
import ITrack from '../track/itrack';
import ArtistComponent from '../artist/artist.component';
import AlbumComponent from '../album/album.component';
import TrackComponent from '../track/track.component';

@Component({
  selector: 'am-search',
  template: require('./search.html'),
  directives: [ArtistComponent, AlbumComponent, TrackComponent]
})
export default class SearchComponent {
  inProgress: boolean = false;
  searchShown: boolean = false;
  search: Control = new Control('');
  artists: Observable<IArtist[]>;
  albums: Observable<IAlbum[]>;
  tracks: Observable<ITrack[]>;
  constructor(private _router:Router, private _apiService:ApiService) {
    this.artists = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((search: string) => this._apiService.searchArtists(search, 0, 5));
    this.albums = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((search: string) => this._apiService.searchAlbums(search, 0, 5));
    this.tracks = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((search: string) => this._apiService.searchTracks(search, 0, 5));
  }
  viewResults(type) {
    const searchText = this.search.value;
    this._router.navigate(['Search', {searchType: type, searchText: searchText}]);
  }
}

//TODO: Implement code to hide dropdowns

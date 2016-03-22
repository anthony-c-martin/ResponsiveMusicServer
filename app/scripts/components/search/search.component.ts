import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/observable';

import ApiService from '../../services/api/api.service';
import IArtist from '../artist/iartist';
import IAlbum from '../album/ialbum';
import ITrack from '../track/itrack';
import ArtistComponent from '../components/artist/artist.component';
import AlbumComponent from '../components/album/album.component';
import TrackComponent from '../components/track/track.component';

@Component({
  selector: 'am-search',
  templateUrl: 'app/scripts/components/search/search.html',
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

import {Component} from 'angular2/core'
import {Router} from 'angular2/router'

import ApiService from '../../services/api/api.service'
import IArtist from '../artist/iartist'
import IAlbum from '../album/ialbum'
import ITrack from '../track/itrack'

@Component({
  selector: 'am-search',
  templateUrl: 'app/scripts/components/search/search.html'
})
export default class SearchComponent {
  inProgress: boolean = false;
  searchShown: boolean = false;
  searchText: string;
  artistsResult: IArtist[];
  albumsResult: IAlbum[];
  tracksResult: ITrack[];
  constructor(private _router:Router, private _apiService:ApiService) {}
  search() {
    this.inProgress = true;
    this.searchShown = true;

    Promise.all([
      this._apiService.searchArtists(this.searchText, 0, 5),
      this._apiService.searchAlbums(this.searchText, 0, 5),
      this._apiService.searchTracks(this.searchText, 0, 5)
    ]).then((results) => {
      this.artistsResult = results[0];
      this.albumsResult = results[1];
      this.tracksResult = results[2];
      this.inProgress = false;
    }, () => {
      this.searchShown = false;
      this.inProgress = false;
    });
  }
  viewResults(type) {
    let searchText = this.searchText;
    this._router.navigate( ['Search', { searchType: type, searchText: searchText }] );
  }
}

//TODO: Implement code to hide dropdowns

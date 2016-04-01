import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import ITrack from '../../components/track/itrack';
import SessionService from '../session/session.service';
import ApiService from '../api/api.service';
import TrackTimerService from '../player/tracktimer.service';

@Injectable()
export default class TrackManagerService {
  private _scrobbleTimer: TrackTimerService;
  private
  constructor(private _sessionService: SessionService, private _apiService: ApiService) {}
  initConversion(track: ITrack) : Observable<ITrack> {
    if (track.FileName) {
      return Observable.of(track);
    }

    return this._apiService.convertTrack(track)
      .map(data => {
        if (data.Result !== 'Success') {
          throw 'Conversion Failed';
        }
        track.FileName = data.FileName;
        return track;
      });
  }
  initScrobbling(track: ITrack) {
    if (this._scrobbleTimer) {
      this._scrobbleTimer.cancel();
      this._scrobbleTimer = null;
    }

    if (!this._sessionService.getPrefs().ScrobblingEnabled) {
      return;
    }

    const duration = (track.Duration / 2 < 240) ? (track.Duration / 2) : 240;
    this._scrobbleTimer = new TrackTimerService(duration);
    this._scrobbleTimer.promise().then(() => {
      this._apiService.lastFmScrobble(track);
    });
    this._apiService.lastFmNowPlaying(track);
  }
  toggleScrobbling(pause: boolean) {
    if (this._scrobbleTimer) {
      this._scrobbleTimer.toggle(pause);
    }
  }
}

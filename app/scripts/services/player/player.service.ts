import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/observable';

import ITrack from '../../components/track/itrack';
import TrackManagerService from './trackmanager.service';
import SessionService from '../session/session.service';
import PlaylistService from '../playlist/playlist.service';

@Injectable()
export default class PlayerService {
  private _currentTrack: ITrack;
  private _playlist: PlaylistService;
  private _historyPlaylist: PlaylistService;
  private _audioEl: Audio;
  constructor(private _trackManagerService: TrackManagerService,
              private _sessionService: SessionService) {
    this._audioEl = new Audio();
    this._playlist = new PlaylistService();
    this._historyPlaylist = new PlaylistService();
  }
  nextTrack() {
    const nextTrack = this._playlist.tracks[0];
    this._changeTrack(nextTrack).subscribe(
      () => {},
      () => {},
      () => {
        this._playlist.removeTrack(nextTrack);
        if (this._currentTrack) {
          this._historyPlaylist.addTrack(this._currentTrack);
        }
        this._currentTrack = nextTrack;
        if (this._playlist.tracks.length > 0) {
          this._trackManagerService.initConversion(this._playlist.tracks[0]);
        }
      }
    );
  }
  previousTrack() {
    if (this._currentTrack && this.getPosition() > 2) {
      this.setPosition(0);
      return;
    }

    const histPlaylistLength = this._historyPlaylist.tracks.length;
    if (histPlaylistLength > 0) {
      const prevTrack = this._historyPlaylist.tracks[histPlaylistLength - 1];
      this._changeTrack(prevTrack).subscribe(
        () => {},
        () => {},
        () => {
          this._historyPlaylist.removeTrack(prevTrack);
          if (this._currentTrack) {
            this._playlist.addTrack(this._currentTrack);
          }
          this._currentTrack = prevTrack;
        }
      );
    } else if (this._currentTrack) {
      this._playlist.addTrack(this._currentTrack, 0);
      this._currentTrack = null;
      this._changeTrack(null);
    }
  }
  setVolume(volume: number) {
    this._audioEl.volume = volume;
  }
  getPosition() : number {
    if (this._audioEl.readyState) {
      return this._audioEl.currentTime;
    }
    return 0;
  }
  setPosition(position: number) {
    if (this._audioEl.readyState) {
      this._audioEl.currentTime = this._audioEl.duration * position;
    }
  }
  setPlaying(play: boolean) {
    if (play) {
      this._audioEl.play();
    } else {
      this._audioEl.pause();
    }
  }
  private _changeTrack(track?: ITrack) : Observable<ITrack> {
    if (!track) {
      this._sendTrackChange();
      return Observable.of(null);
    }

    const conversionResult = this._trackManagerService.initConversion(track)
    conversionResult.subscribe(
      (track) => {
        this._sendTrackChange(track);
        this._trackManagerService.initScrobbling(track);
      },
      () => {
        this._sendTrackChange();
      }
    );

    return conversionResult;
  }
  private _sendTrackChange(track?: ITrack) {
    if (track !== undefined) {
      let audioSrc = '/stream';
      audioSrc += '?FileName=' + encodeURIComponent(track.FileName);
      audioSrc += '&Session=' + encodeURIComponent(this._sessionService.get().Session);
      this._audioEl.src = audioSrc;
      this._audioEl.type = 'audio/mp4';
    } else {
      this._audioEl.src = '';
      this._audioEl.type = '';
    }
    this._audioEl.load();
  }
}

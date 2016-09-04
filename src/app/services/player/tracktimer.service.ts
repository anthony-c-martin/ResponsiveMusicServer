import {Injectable} from '@angular/core'

@Injectable()
export default class TrackTimerService {
  private _paused: boolean = false;
  private _time: number = 0;
  private _timer: any;
  private _promise: Promise<void>;
  private _resolvePromise: () => void;
  private _rejectPromise: () => void;
  constructor(private _duration: number) {
    this._timer = setInterval(() => {
      if (!this._paused) {
        this._time++;
      }
      if (this._time >= this._duration) {
        clearInterval(this._timer);
        this._resolvePromise();
      }
    },1000);
    this._promise = new Promise<void>((resolve, reject) => {
      this._resolvePromise = resolve;
      this._rejectPromise = reject;
    });
  }
  toggle(pause: boolean) {
    this._paused = pause;
  }
  promise() : Promise<void> {
    return this._promise;
  }
  cancel() {
    clearInterval(this._timer);
    this._rejectPromise();
  }
}

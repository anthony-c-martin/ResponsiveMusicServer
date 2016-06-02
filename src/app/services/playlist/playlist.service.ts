import ITrack from '../../components/track/itrack'

export default class PlaylistService {
  tracks: ITrack[];
  addTrack(track: ITrack, position?: number) {
    this.addTracks([track], position);
  }
  addTracks(tracks: ITrack[], position?: number) {
    if (position === undefined) {
      position = this.tracks.length;
    }
    const endChunk = this.tracks.slice(position, this.tracks.length);
    this.tracks.length = position;

    tracks.forEach(track => {
      this.tracks.push(track.clone());
    });
    endChunk.forEach(track => {
      this.tracks.push(track);
    });
  }
  selectTracks(tracks: ITrack[]) {
    tracks.forEach(track => {
      track.isSelected = true;
    });
  }
  removeTrack(track: ITrack) {
    const index = this.tracks.indexOf(track);
    if (index > -1) {
      this.tracks.splice(index, 1);
    }
  }
  removeTracks(tracks: ITrack[]) {
    tracks.forEach(track => {
      this.removeTrack(track);
    });
  }
  removeAll() {
    this.tracks.length = 0;
  }
  unselectAll() {
    this.tracks.forEach(track => {
      delete track.isSelected;
    });
  }
}

interface ITrack {
  ID: string;
  Name: string;
  Duration: number;
  FileName?: string;
  selected: boolean;
  clone() : ITrack;
}

export default ITrack;

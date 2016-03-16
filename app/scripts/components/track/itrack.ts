interface ITrack {
  ID: string;
  Name: string;
  selected: boolean;
  clone() : ITrack;
}

export default ITrack;

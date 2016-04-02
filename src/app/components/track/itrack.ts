interface ITrack {
  ID: string;
  Name: string;
  Duration: number;
  FileName?: string;
  isSelected: boolean;
  clone() : ITrack;
}

export default ITrack;

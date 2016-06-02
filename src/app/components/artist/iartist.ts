interface IArtist {
  ID: number;
  Name: string;
  isSelected: boolean;
  clone() : IArtist;
}

export default IArtist

interface IAlbum {
  ID: number;
  Name: string;
  isSelected: boolean;
  clone() : IAlbum;
}

export default IAlbum

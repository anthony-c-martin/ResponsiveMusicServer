interface IAlbum {
  ID: number;
  Name: string;
  clone() : IAlbum;
}

export default IAlbum

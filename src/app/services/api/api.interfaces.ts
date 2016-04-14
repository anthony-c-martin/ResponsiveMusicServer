export interface ISuccessResponse {
  Success: boolean;
}

export interface IArtist {
  ID: number;
  Name: string;
}

export interface IAlbum {
  ID: number;
  Name: string;
}

export interface ITrack {
  ID: string;
  Name: string;
  Duration: number;
  FileName?: string;
}

export interface IConversionResult {
  Result: string;
  FileName: string;
}

export interface ISession {
  Session: string;
  Secret: string;
}

export interface IUserPreferences {
  ScrobblingEnabled: boolean;
}

export interface IToken {
  Token: string;
}

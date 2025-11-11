export interface Album {
  _id: string;
  name: string;
  releaseYear: string;
  artistId: string;
}

export interface AlbumResponse {
  _id: string;
  name: string;
  artistId: string | { _id: string; name?: string };
  releaseDate?: string;
}

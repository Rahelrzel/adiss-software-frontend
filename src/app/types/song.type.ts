export interface PopulatedArtist {
  _id: string;
  name: string;
}

export interface PopulatedAlbum {
  _id: string;
  name: string;
}

export interface PopulatedGenre {
  _id: string;
  name: string;
}

export interface SongResponse {
  _id: string;
  title: string;
  artistId: string | PopulatedArtist;
  albumId: string | PopulatedAlbum;
  genre: (string | PopulatedGenre)[];
  spotifyUrl?: string;
  image?: string;
  playlistId?: string;
  createdAt: string;
}

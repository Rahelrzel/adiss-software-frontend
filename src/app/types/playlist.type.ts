export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  songs: Song[];
  isPublished: boolean;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface PlaylistResponse extends Playlist {}

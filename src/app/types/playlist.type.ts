import type { SongResponse } from "./song.type";

export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  songs: SongResponse[];
  isPublished: boolean;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PlaylistResponse extends Playlist {}

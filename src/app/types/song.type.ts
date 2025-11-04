export interface SongResponse {
  _id: string;
  title: string;
  artistId: string;
  albumId: string;
  genres: [];
  spotifyUrl?: string;
  preview_url?: string;
  image?: string;
  playlistId?: string;
  createdAt: string;
}

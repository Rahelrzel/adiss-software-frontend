export interface Song {
  _id: string;
  title: string;
  artistId: string;
  albumId: string;
  spotifyUrl?: string;
  preview_url?: string;
  image?: string;
  playlistId?: string;
  createdAt: string;
}

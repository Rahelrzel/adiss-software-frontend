import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";

export interface TotalsStats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

export interface SongsByGenre {
  genre: string;
  songCount: number;
}

export interface ArtistStats {
  artist: string;
  songCount: number;
  albumCount: number;
}

export interface AlbumStats {
  album: string;
  artist: string;
  songCount: number;
}

const getTotals = async (token: string) => {
  const data = await axios
    .get<TotalsStats>(`${apiUrl}/api/stat/totals`, authHeader(token))
    .then((res) => res.data);
  return data;
};

const getSongsByGenre = async (token: string) => {
  const data = await axios
    .get<SongsByGenre[]>(`${apiUrl}/api/stat/songs-by-genre`, authHeader(token))
    .then((res) => res.data);
  return data;
};

const getArtistStats = async (token: string) => {
  const data = await axios
    .get<ArtistStats[]>(`${apiUrl}/api/stat/artist-stats`, authHeader(token))
    .then((res) => res.data);
  return data;
};

const getAlbumStats = async (token: string) => {
  const data = await axios
    .get<AlbumStats[]>(`${apiUrl}/api/stat/album-stats`, authHeader(token))
    .then((res) => res.data);
  return data;
};

export default {
  getTotals,
  getSongsByGenre,
  getArtistStats,
  getAlbumStats,
};

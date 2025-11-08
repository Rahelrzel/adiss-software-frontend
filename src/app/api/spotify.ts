import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";

export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  preview_url?: string | null;
  image?: string;
  external_url: string;
  genre?: string;
  spotifyUrl: string;
}

export interface SpotifySearchResponse {
  success: boolean;
  data: SpotifyTrack[];
}

const searchTracks = async (query: string, token?: string) => {
  if (!query.trim()) {
    return { success: false, data: [] };
  }

  const headers = token ? authHeader(token) : {};

  const res = await axios
    .get<SpotifySearchResponse>(
      `${apiUrl}/api/spotify/search?query=${encodeURIComponent(query)}`,
      headers
    )
    .then((res) => res.data);

  return res;
};

export default {
  searchTracks,
};

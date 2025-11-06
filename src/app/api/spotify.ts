import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";

// Type for Spotify track (based on your backend response)
export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  preview_url?: string | null;
  image?: string;
  external_url: string;
  genre?: string;
}

// Response type
export interface SpotifySearchResponse {
  success: boolean;
  data: SpotifyTrack[];
}

/**
 * Search tracks on Spotify
 * @param query The search query (song title, artist, etc.)
 * @param token Auth token if needed (optional)
 */
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

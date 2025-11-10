import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { SongResponse } from "../types/song.type";

export interface CreateSongParams {
  title: string;
  artistId: string;
  albumId: string;
  genre: string[];
  spotifyUrl?: string;
  image?: string;
  playlistId?: string;
}

// For updating, we’ll send all fields *except id* in the body
export interface UpdateSongParams extends Partial<CreateSongParams> {}

// ✅ Create song
const createSong = async (data: CreateSongParams, token: string) => {
  const res = await axios.post<SongResponse>(
    `${apiUrl}/api/songs`,
    data,
    authHeader(token)
  );
  return res.data;
};

// ✅ Get all songs
const getSongs = async (token: string) => {
  const res = await axios.get<SongResponse[]>(
    `${apiUrl}/api/songs`,
    authHeader(token)
  );
  return res.data;
};

// ✅ Get single song by ID
const getSongById = async (id: string, token: string) => {
  const res = await axios.get<SongResponse>(
    `${apiUrl}/api/songs/${id}`,
    authHeader(token)
  );
  return res.data;
};

// ✅ Update song (id only in URL — not in body)
const updateSong = async (
  id: string,
  data: UpdateSongParams,
  token: string
) => {
  const res = await axios.put<SongResponse>(
    `${apiUrl}/api/songs/${id}`,
    data,
    authHeader(token)
  );
  return res.data;
};

// ✅ Delete song
const deleteSong = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/songs/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default { createSong, getSongs, getSongById, updateSong, deleteSong };

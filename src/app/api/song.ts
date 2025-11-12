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

export interface UpdateSongParams extends Partial<CreateSongParams> {}

const createSong = async (data: CreateSongParams, token: string) => {
  const res = await axios.post<SongResponse>(
    `${apiUrl}/api/songs`,
    data,
    authHeader(token)
  );
  return res.data;
};

const getSongs = async (token: string, search?: string) => {
  const res = await axios.get<SongResponse[]>(`${apiUrl}/api/songs`, {
    ...authHeader(token),
    params: search ? { q: search } : {},
  });
  return res.data;
};

const getSongById = async (id: string, token: string) => {
  const res = await axios.get<SongResponse>(
    `${apiUrl}/api/songs/${id}`,
    authHeader(token)
  );
  return res.data;
};

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

const deleteSong = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/songs/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default { createSong, getSongs, getSongById, updateSong, deleteSong };

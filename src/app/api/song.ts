import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { SongResponse } from "../types/song.type";

export interface CreateSongParams {
  title: string;
  artistId: string;
  albumId: string;
  spotifyUrl?: string;
  preview_url?: string;
  image?: string;
  playlistId?: string;
}

export interface UpdateSongParams extends Partial<CreateSongParams> {
  id: string;
}

const createSong = async (data: CreateSongParams, token: string) => {
  const song = await axios
    .post<SongResponse>(`${apiUrl}/api/songs`, data, authHeader(token))
    .then((res) => res.data);
  return song;
};

const getSongs = async (token: string) => {
  const songs = await axios
    .get<SongResponse[]>(`${apiUrl}/api/songs`, authHeader(token))
    .then((res) => res.data);
  return songs;
};

const getSongById = async (id: string, token: string) => {
  const song = await axios
    .get<SongResponse>(`${apiUrl}/api/songs/${id}`, authHeader(token))
    .then((res) => res.data);
  return song;
};

const updateSong = async (data: UpdateSongParams, token: string) => {
  const song = await axios
    .put<SongResponse>(
      `${apiUrl}/api/songs/${data.id}`,
      data,
      authHeader(token)
    )
    .then((res) => res.data);
  return song;
};

const deleteSong = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/songs/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default { createSong, getSongs, getSongById, updateSong, deleteSong };

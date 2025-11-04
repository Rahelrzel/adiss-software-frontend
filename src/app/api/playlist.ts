import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { PlaylistResponse } from "../types/playlist.type";

export interface CreatePlaylistParams {
  name: string;
  description?: string;
  songs?: string[];
  isPublished?: boolean;
}

export interface UpdatePlaylistParams {
  id: string;
  name?: string;
  description?: string;
  songs?: string[];
  isPublished?: boolean;
}

const createPlaylist = async (data: CreatePlaylistParams, token: string) => {
  const playlist = await axios
    .post<PlaylistResponse>(`${apiUrl}/api/playlist`, data, authHeader(token))
    .then((res) => res.data);
  return playlist;
};

const getPlaylists = async () => {
  const playlists = await axios
    .get<PlaylistResponse[]>(`${apiUrl}/api/playlists`)
    .then((res) => res.data);
  return playlists;
};

const getPlaylistById = async (id: string) => {
  const playlist = await axios
    .get<PlaylistResponse>(`${apiUrl}/api/playlists/${id}`)
    .then((res) => res.data);
  return playlist;
};

const updatePlaylist = async (data: UpdatePlaylistParams) => {
  const playlist = await axios
    .put<PlaylistResponse>(`${apiUrl}/api/playlists/${data.id}`, data)
    .then((res) => res.data);
  return playlist;
};

const deletePlaylist = async (id: string) => {
  const res = await axios.delete(`${apiUrl}/api/playlists/${id}`);
  return res.data;
};

export default {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
};

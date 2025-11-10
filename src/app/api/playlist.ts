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

const getPlaylists = async (token: string) => {
  const playlists = await axios
    .get<PlaylistResponse[]>(`${apiUrl}/api/playlist`, authHeader(token))
    .then((res) => res.data);
  return playlists;
};

const getPlaylistById = async (id: string, token: string) => {
  const playlist = await axios
    .get<PlaylistResponse>(`${apiUrl}/api/playlist/${id}`, authHeader(token))
    .then((res) => res.data);
  return playlist;
};

const updatePlaylist = async (data: UpdatePlaylistParams) => {
  const playlist = await axios
    .put<PlaylistResponse>(`${apiUrl}/api/playlist/${data.id}`, data)
    .then((res) => res.data);
  return playlist;
};

const deletePlaylist = async (id: string) => {
  const res = await axios.delete(`${apiUrl}/api/playlist/${id}`);
  return res.data;
};

interface RemoveSongParams {
  playlistId: string;
  songId: string;
}

const removeSongFromPlaylist = async (
  data: RemoveSongParams,
  token: string
) => {
  const res = await axios
    .post<PlaylistResponse>(
      `${apiUrl}/api/playlist/remove-song`,
      data,
      authHeader(token)
    )
    .then((res) => res.data);

  return res;
};

export default {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
};

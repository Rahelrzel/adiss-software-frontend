import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { Album } from "../types/album.type";

export interface CreateAlbumParams {
  name: string;
  releaseYear: number;
  artistId: string;
}

export interface UpdateAlbumParams extends Partial<CreateAlbumParams> {
  id: string;
}

const createAlbum = async (data: CreateAlbumParams, token: string) => {
  const album = await axios
    .post<Album>(`${apiUrl}/api/album`, data, authHeader(token))
    .then((res) => res.data);
  return album;
};

const getAlbums = async (token: string) => {
  const albums = await axios
    .get<Album[]>(`${apiUrl}/api/album`, authHeader(token))
    .then((res) => res.data);
  return albums;
};

const getAlbumById = async (id: string, token: string) => {
  const album = await axios
    .get<Album>(`${apiUrl}/api/album/${id}`, authHeader(token))
    .then((res) => res.data);
  return album;
};

const updateAlbum = async (data: UpdateAlbumParams, token: string) => {
  const album = await axios
    .put<Album>(`${apiUrl}/api/album/${data.id}`, data, authHeader(token))
    .then((res) => res.data);
  return album;
};

const deleteAlbum = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/album/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};

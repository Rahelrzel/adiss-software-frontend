import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { Artist } from "../types/artist.type";

export interface CreateArtistParams {
  name: string;
  userId: string;
}

export interface UpdateArtistParams extends Partial<CreateArtistParams> {
  id: string;
}

const createArtist = async (data: CreateArtistParams, token: string) => {
  const artist = await axios
    .post<Artist>(`${apiUrl}/api/artist`, data, authHeader(token))
    .then((res) => res.data);
  return artist;
};

const getArtists = async (token: string) => {
  const artists = await axios
    .get<Artist[]>(`${apiUrl}/api/artist`, authHeader(token))
    .then((res) => res.data);
  return artists;
};

const getArtistById = async (id: string, token: string) => {
  const artist = await axios
    .get<Artist>(`${apiUrl}/api/artist/${id}`, authHeader(token))
    .then((res) => res.data);
  return artist;
};

const updateArtist = async (data: UpdateArtistParams, token: string) => {
  const artist = await axios
    .put<Artist>(`${apiUrl}/api/artist/${data.id}`, data, authHeader(token))
    .then((res) => res.data);
  return artist;
};

const deleteArtist = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/artist/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};

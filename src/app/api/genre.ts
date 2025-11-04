import axios from "axios";
import { apiUrl, authHeader } from "../../config/api";
import type { Genre } from "../types/genre";

export interface CreateGenreParams {
  name: string;
}

export interface UpdateGenreParams extends Partial<CreateGenreParams> {
  id: string;
}

const createGenre = async (data: CreateGenreParams, token: string) => {
  const genre = await axios
    .post<Genre>(`${apiUrl}/api/genre`, data, authHeader(token))
    .then((res) => res.data);
  return genre;
};

const getGenres = async (token: string) => {
  const genres = await axios
    .get<Genre[]>(`${apiUrl}/api/genre`, authHeader(token))
    .then((res) => res.data);
  return genres;
};

const getGenreById = async (id: string, token: string) => {
  const genre = await axios
    .get<Genre>(`${apiUrl}/api/genre/${id}`, authHeader(token))
    .then((res) => res.data);
  return genre;
};

const updateGenre = async (data: UpdateGenreParams, token: string) => {
  const genre = await axios
    .put<Genre>(`${apiUrl}/api/genre/${data.id}`, data, authHeader(token))
    .then((res) => res.data);
  return genre;
};

const deleteGenre = async (id: string, token: string) => {
  const res = await axios.delete(
    `${apiUrl}/api/genre/${id}`,
    authHeader(token)
  );
  return res.data;
};

export default {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};

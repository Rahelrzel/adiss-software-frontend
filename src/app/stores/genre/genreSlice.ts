import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CreateGenreParams } from "../../api/genre";
import type { Genre } from "../../types/genre";

interface GenreState {
  genres: Genre[];
  genre?: Genre;
  loading: boolean;
  error: string | null;
}

const initialState: GenreState = {
  genres: [],
  genre: undefined,
  loading: false,
  error: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    // --- Create Genre ---
    createGenreRequest: (state, _action: PayloadAction<CreateGenreParams>) => {
      state.loading = true;
      state.error = null;
    },
    createGenreSuccess: (state, action: PayloadAction<Genre>) => {
      state.loading = false;
      state.genres.push(action.payload);
    },
    createGenreError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to create genre";
    },

    // --- Get All Genres ---
    getGenresRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGenresSuccess: (state, action: PayloadAction<Genre[]>) => {
      state.loading = false;
      state.genres = action.payload;
    },
    getGenresError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch genres";
    },
  },
});

export const {
  createGenreRequest,
  createGenreSuccess,
  createGenreError,
  getGenresRequest,
  getGenresSuccess,
  getGenresError,
} = genreSlice.actions;

export default genreSlice.reducer;

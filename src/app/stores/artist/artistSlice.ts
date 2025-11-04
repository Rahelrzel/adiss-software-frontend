import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CreateArtistParams } from "../../api/artist";
import type { Artist } from "../../types/artist.type";

interface ArtistState {
  artists: Artist[];
  artist?: Artist;
  loading: boolean;
  error: string | null;
}

const initialState: ArtistState = {
  artists: [],
  artist: undefined,
  loading: false,
  error: null,
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    // --- Create Artist ---
    createArtistRequest: (
      state,
      _action: PayloadAction<CreateArtistParams>
    ) => {
      state.loading = true;
      state.error = null;
    },
    createArtistSuccess: (state, action: PayloadAction<Artist>) => {
      state.loading = false;
      state.artists.push(action.payload);
    },
    createArtistError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to create artist";
    },

    // --- Get All Artists ---
    getArtistsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getArtistsSuccess: (state, action: PayloadAction<Artist[]>) => {
      state.loading = false;
      state.artists = action.payload;
    },
    getArtistsError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch artists";
    },
  },
});

export const {
  createArtistRequest,
  createArtistSuccess,
  createArtistError,
  getArtistsRequest,
  getArtistsSuccess,
  getArtistsError,
} = artistSlice.actions;

export default artistSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CreateAlbumParams } from "../../api/album";
import type { Album } from "../../types/album.type";

interface AlbumState {
  albums: Album[];
  album?: Album;
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albums: [],
  album: undefined,
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    // --- Create Album ---
    createAlbumRequest: (state, _action: PayloadAction<CreateAlbumParams>) => {
      state.loading = true;
      state.error = null;
    },
    createAlbumSuccess: (state, action: PayloadAction<Album>) => {
      state.loading = false;
      state.albums.push(action.payload);
    },
    createAlbumError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to create album";
    },

    // --- Get All Albums ---
    getAlbumsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAlbumsSuccess: (state, action: PayloadAction<Album[]>) => {
      state.loading = false;
      state.albums = action.payload;
    },
    getAlbumsError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch albums";
    },
  },
});

export const {
  createAlbumRequest,
  createAlbumSuccess,
  createAlbumError,
  getAlbumsRequest,
  getAlbumsSuccess,
  getAlbumsError,
} = albumSlice.actions;

export default albumSlice.reducer;

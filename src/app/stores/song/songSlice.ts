import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SongResponse } from "../../types/song.type";
import type { ErrorResponse } from "../../types/user.type";
import type { CreateSongParams } from "../../api/song";

interface SongState {
  loading: boolean;
  error?: ErrorResponse;
  songs: SongResponse[];
  currentSong?: SongResponse;
}

const initialState: SongState = {
  loading: false,
  error: undefined,
  songs: [],
  currentSong: undefined,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSongsRequest: (
      state,
      _action: PayloadAction<{ search?: string } | undefined>
    ) => {
      state.loading = true;
    },

    fetchSongsSuccess: (state, action: PayloadAction<SongResponse[]>) => {
      state.songs = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    fetchSongsError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    createSongRequest: (state, _action: PayloadAction<CreateSongParams>) => {
      state.loading = true;
    },
    createSongSuccess: (state, action: PayloadAction<SongResponse>) => {
      state.songs.push(action.payload);
      state.loading = false;
      state.error = undefined;
    },
    createSongError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchSongByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchSongByIdSuccess: (state, action: PayloadAction<SongResponse>) => {
      state.currentSong = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    fetchSongByIdError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSongRequest: (
      state,
      _action: PayloadAction<{ id: string; data: Partial<SongResponse> }>
    ) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<SongResponse>) => {
      const index = state.songs.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.currentSong = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    updateSongError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsError,
  createSongRequest,
  createSongSuccess,
  createSongError,
  fetchSongByIdRequest,
  fetchSongByIdSuccess,
  fetchSongByIdError,
  updateSongSuccess,
  updateSongRequest,
  updateSongError,
} = songSlice.actions;

export default songSlice.reducer;

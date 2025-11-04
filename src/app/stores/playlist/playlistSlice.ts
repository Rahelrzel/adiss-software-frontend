import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorResponse } from "../../types/user.type";
import type { PlaylistResponse } from "../../types/playlist.type";
import type {
  CreatePlaylistParams,
  UpdatePlaylistParams,
} from "../../api/playlist";

interface PlaylistState {
  loading: boolean;
  error?: ErrorResponse;
  playlist: PlaylistResponse[];
  currentPlaylist?: PlaylistResponse;
}

const initialState: PlaylistState = {
  loading: false,
  error: undefined,
  playlist: [],
  currentPlaylist: undefined,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    fetchPlaylistsRequest: (state) => {
      state.loading = true;
    },
    fetchPlaylistsSuccess: (
      state,
      action: PayloadAction<PlaylistResponse[]>
    ) => {
      state.playlist = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    fetchPlaylistsError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    createPlaylistRequest: (
      state,
      _action: PayloadAction<CreatePlaylistParams>
    ) => {
      state.loading = true;
    },
    createPlaylistSuccess: (state, action: PayloadAction<PlaylistResponse>) => {
      state.playlist.push(action.payload);
      state.loading = false;
      state.error = undefined;
    },
    createPlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchPlaylistByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchPlaylistByIdSuccess: (
      state,
      action: PayloadAction<PlaylistResponse>
    ) => {
      state.currentPlaylist = action.payload;
      state.loading = false;
    },
    fetchPlaylistByIdError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    updatePlaylistRequest: (
      state,
      _action: PayloadAction<UpdatePlaylistParams>
    ) => {
      state.loading = true;
    },
    updatePlaylistSuccess: (state, action: PayloadAction<PlaylistResponse>) => {
      const index = state.playlist.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) state.playlist[index] = action.payload;
      state.loading = false;
    },
    updatePlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    deletePlaylistRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deletePlaylistSuccess: (state, action: PayloadAction<string>) => {
      state.playlist = state.playlist.filter((p) => p._id !== action.payload);
      state.loading = false;
    },
    deletePlaylistError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPlaylistsRequest,
  fetchPlaylistsSuccess,
  fetchPlaylistsError,
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistError,
  updatePlaylistRequest,
  updatePlaylistSuccess,
  updatePlaylistError,
  deletePlaylistRequest,
  deletePlaylistSuccess,
  deletePlaylistError,
  fetchPlaylistByIdRequest,
  fetchPlaylistByIdSuccess,
  fetchPlaylistByIdError,
} = playlistSlice.actions;

export default playlistSlice.reducer;

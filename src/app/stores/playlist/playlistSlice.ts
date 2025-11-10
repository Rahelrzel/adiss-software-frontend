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

    removeSongFromPlaylistRequest: (
      state,
      _action: PayloadAction<{ playlistId: string; songId: string }>
    ) => {
      state.loading = true;
    },
    removeSongFromPlaylistSuccess: (
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>
    ) => {
      const { playlistId, songId } = action.payload;

      // ✅ Update playlists array
      const playlistIndex = state.playlist.findIndex(
        (p) => p._id === playlistId
      );
      if (playlistIndex !== -1) {
        state.playlist[playlistIndex].songs = state.playlist[
          playlistIndex
        ].songs?.filter((song) => song._id !== songId);
      }

      // ✅ Update currentPlaylist if it's the one being modified
      if (state.currentPlaylist?._id === playlistId) {
        state.currentPlaylist = {
          ...state.currentPlaylist,
          songs:
            state.currentPlaylist.songs?.filter(
              (song) => song._id !== songId
            ) || [],
        };
      }

      state.loading = false;
      state.error = undefined;
    },

    removeSongFromPlaylistError: (
      state,
      action: PayloadAction<ErrorResponse>
    ) => {
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
  removeSongFromPlaylistError,
  removeSongFromPlaylistRequest,
  removeSongFromPlaylistSuccess,
} = playlistSlice.actions;

export default playlistSlice.reducer;

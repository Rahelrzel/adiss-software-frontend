import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SpotifyTrack } from "../../api/spotify";

interface SpotifyState {
  tracks: SpotifyTrack[];
  loading: boolean;
  error: string | null;
  query: string;
}

const initialState: SpotifyState = {
  tracks: [],
  loading: false,
  error: null,
  query: "",
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    searchTracksRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.query = action.payload;
    },
    searchTracksSuccess: (state, action: PayloadAction<SpotifyTrack[]>) => {
      state.loading = false;
      state.tracks = action.payload;
    },
    searchTracksError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to search tracks";
    },

    clearSpotifyResults: (state) => {
      state.tracks = [];
      state.query = "";
      state.error = null;
    },
  },
});

export const {
  searchTracksRequest,
  searchTracksSuccess,
  searchTracksError,
  clearSpotifyResults,
} = spotifySlice.actions;

export default spotifySlice.reducer;

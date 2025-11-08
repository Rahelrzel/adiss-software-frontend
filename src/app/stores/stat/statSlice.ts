import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AlbumStats,
  ArtistStats,
  SongsByGenre,
  TotalsStats,
} from "../../api/stat";

interface StatState {
  totals?: TotalsStats;
  songsByGenre: SongsByGenre[];
  artistStats: ArtistStats[];
  albumStats: AlbumStats[];
  loading: boolean;
  error: string | null;
}

const initialState: StatState = {
  totals: undefined,
  songsByGenre: [],
  artistStats: [],
  albumStats: [],
  loading: false,
  error: null,
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {
    getTotalsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTotalsSuccess: (state, action: PayloadAction<TotalsStats>) => {
      state.loading = false;
      state.totals = action.payload;
    },
    getTotalsError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch totals";
    },

    getSongsByGenreRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSongsByGenreSuccess: (state, action: PayloadAction<SongsByGenre[]>) => {
      state.loading = false;
      state.songsByGenre = action.payload;
    },
    getSongsByGenreError: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch songs by genre";
    },

    getArtistStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getArtistStatsSuccess: (state, action: PayloadAction<ArtistStats[]>) => {
      state.loading = false;
      state.artistStats = action.payload;
    },
    getArtistStatsError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch artist stats";
    },

    getAlbumStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAlbumStatsSuccess: (state, action: PayloadAction<AlbumStats[]>) => {
      state.loading = false;
      state.albumStats = action.payload;
    },
    getAlbumStatsError: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch album stats";
    },
  },
});

export const {
  getTotalsRequest,
  getTotalsSuccess,
  getTotalsError,
  getSongsByGenreRequest,
  getSongsByGenreSuccess,
  getSongsByGenreError,
  getArtistStatsRequest,
  getArtistStatsSuccess,
  getArtistStatsError,
  getAlbumStatsRequest,
  getAlbumStatsSuccess,
  getAlbumStatsError,
} = statSlice.actions;

export default statSlice.reducer;

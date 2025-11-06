import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";
import { AxiosError } from "axios";
import spotifyApi from "../../api/spotify";
import {
  searchTracksRequest,
  searchTracksSuccess,
  searchTracksError,
} from "./spotifySlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function* searchTracks(action: PayloadAction<string>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const response: SagaReturnType<typeof spotifyApi.searchTracks> = yield call(
      spotifyApi.searchTracks,
      action.payload,
      token
    );

    if (response.success) {
      yield put(searchTracksSuccess(response.data));
    } else {
      yield put(searchTracksError("Spotify returned no results"));
    }
  } catch (e: any) {
    if (e instanceof AxiosError) {
      yield put(searchTracksError(e.response?.data?.message || e.message));
    } else {
      yield put(searchTracksError(e?.message || "Failed to search Spotify"));
    }
  }
}

export function* spotifySaga() {
  yield takeLatest(searchTracksRequest.type, searchTracks);
}

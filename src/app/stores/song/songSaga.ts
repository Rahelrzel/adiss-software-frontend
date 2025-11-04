import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateSongParams } from "../../api/song";
import { call, put, takeEvery, type SagaReturnType } from "redux-saga/effects";
import songApi from "../../api/song";
import {
  createSongError,
  createSongRequest,
  createSongSuccess,
  fetchSongByIdRequest,
  fetchSongsError,
  fetchSongsSuccess,
} from "./songSlice";
import { AxiosError } from "axios";

function* CreateSong(action: PayloadAction<CreateSongParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("user token not found ");
    let song: SagaReturnType<typeof songApi.createSong> = yield call(
      songApi.createSong,
      action.payload,
      token
    );
    yield put(createSongSuccess(song));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(createSongError(e.response?.data));
    }
  }
}

function* FetchSongs() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");
    const songs: SagaReturnType<typeof songApi.getSongs> = yield call(
      songApi.getSongs,
      token
    );
    yield put(fetchSongsSuccess(songs));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(fetchSongsError(e.response?.data));
    }
  }
}

function* GetSongById(action: PayloadAction<string>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");
    const song: SagaReturnType<typeof songApi.getSongById> = yield call(
      songApi.getSongById,
      action.payload,
      token
    );

    yield put(fetchSongsSuccess([song]));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(fetchSongsError(e.response?.data));
    }
  }
}

export function* watchCreateSong() {
  yield takeEvery(createSongRequest.type, CreateSong);
}

export function* watchFetchSong() {
  yield takeEvery(fetchSongByIdRequest.type, FetchSongs);
}

export function* watchGetSongById() {
  yield takeEvery(fetchSongByIdRequest.type, GetSongById);
}

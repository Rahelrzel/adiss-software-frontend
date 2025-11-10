import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateSongParams, UpdateSongParams } from "../../api/song";
import { call, put, takeEvery, type SagaReturnType } from "redux-saga/effects";
import songApi from "../../api/song";
import {
  createSongError,
  createSongRequest,
  createSongSuccess,
  fetchSongByIdError,
  fetchSongByIdRequest,
  fetchSongByIdSuccess,
  fetchSongsError,
  fetchSongsRequest,
  fetchSongsSuccess,
  updateSongError,
  updateSongRequest,
  updateSongSuccess,
} from "./songSlice";
import { AxiosError } from "axios";
import type { SongResponse } from "../../types/song.type";

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

    yield put(fetchSongByIdSuccess(song));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(fetchSongByIdError(e.response?.data));
    }
  }
}

function* UpdateSong(
  action: PayloadAction<{ id: string; data: Partial<SongResponse> }>
) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const { id, data } = action.payload;

    const payload: UpdateSongParams = {
      title: data.title,
      spotifyUrl: data.spotifyUrl,
      image: data.image,
      playlistId: data.playlistId,
      artistId:
        typeof data.artistId === "string"
          ? data.artistId
          : (data.artistId as any)?._id,
      albumId:
        typeof data.albumId === "string"
          ? data.albumId
          : (data.albumId as any)?._id,
      genre: data.genre?.map((g: any) => (typeof g === "string" ? g : g._id)),
    };

    const updatedSong: SongResponse = yield call(
      songApi.updateSong,
      id,
      payload,
      token
    );

    yield put(updateSongSuccess(updatedSong));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(updateSongError(e.response?.data));
    }
  }
}

export function* watchCreateSong() {
  yield takeEvery(createSongRequest.type, CreateSong);
}

export function* watchFetchSong() {
  yield takeEvery(fetchSongsRequest.type, FetchSongs);
}

export function* watchGetSongById() {
  yield takeEvery(fetchSongByIdRequest.type, GetSongById);
}

export function* watchUpdateSong() {
  yield takeEvery(updateSongRequest.type, UpdateSong);
}

import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateSongParams, UpdateSongParams } from "../../api/song";
import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";
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
import { showErrorToast } from "../../components/Toast";

function normalizeError(e: unknown) {
  if (e instanceof AxiosError) {
    const message = e.response?.data?.message || "Something went wrong";
    return { msg: message };
  }
  return { msg: "Something went wrong" };
}

function* CreateSong(action: PayloadAction<CreateSongParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");
    const song: SagaReturnType<typeof songApi.createSong> = yield call(
      songApi.createSong,
      action.payload,
      token
    );
    yield put(createSongSuccess(song));
  } catch (e: unknown) {
    const error = normalizeError(e);
    showErrorToast(error.msg);
    yield put(createSongError(error));
  }
}

function* FetchSongs(action: PayloadAction<{ search?: string } | undefined>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const search = action.payload?.search?.trim() || "";

    const songs: SagaReturnType<typeof songApi.getSongs> = yield call(
      songApi.getSongs,
      token,
      search
    );

    yield put(fetchSongsSuccess(songs));
  } catch (e: unknown) {
    const error = normalizeError(e);
    showErrorToast(error.msg);
    yield put(fetchSongsError(error));
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
  } catch (e: unknown) {
    const error = normalizeError(e);
    showErrorToast(error.msg);
    yield put(fetchSongByIdError(error));
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
  } catch (e: unknown) {
    const error = normalizeError(e);
    showErrorToast(error.msg);
    yield put(updateSongError(error));
  }
}

export function* watchCreateSong() {
  yield takeLatest(createSongRequest.type, CreateSong);
}

export function* watchFetchSong() {
  yield takeLatest(fetchSongsRequest.type, FetchSongs);
}

export function* watchGetSongById() {
  yield takeLatest(fetchSongByIdRequest.type, GetSongById);
}

export function* watchUpdateSong() {
  yield takeLatest(updateSongRequest.type, UpdateSong);
}

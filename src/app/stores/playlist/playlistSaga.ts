import { call, put, takeEvery, type SagaReturnType } from "redux-saga/effects";
import { AxiosError } from "axios";
import PlaylistApi, {
  type CreatePlaylistParams,
  type UpdatePlaylistParams,
} from "../../api/playlist";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
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
} from "./playlistSlice";

function* FetchPlaylists() {
  try {
    let playlists: SagaReturnType<typeof PlaylistApi.getPlaylists> = yield call(
      PlaylistApi.getPlaylists
    );
    console.log("✅ [Saga] Fetch Playlists:", playlists);
    yield put(fetchPlaylistsSuccess(playlists));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(fetchPlaylistsError(e.response?.data));
    }
  }
}

function* CreatePlaylist(action: PayloadAction<CreatePlaylistParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    if (!token) throw new Error("User token not found");

    let playlist: SagaReturnType<typeof PlaylistApi.createPlaylist> =
      yield call(PlaylistApi.createPlaylist, action.payload, token);
    console.log("✅ [Saga] Create Playlist:", playlist);
    yield put(createPlaylistSuccess(playlist));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(createPlaylistError(e.response?.data));
    }
  }
}

function* UpdatePlaylist(action: PayloadAction<UpdatePlaylistParams>) {
  try {
    let updated: SagaReturnType<typeof PlaylistApi.updatePlaylist> = yield call(
      PlaylistApi.updatePlaylist,
      action.payload
    );
    console.log("✅ [Saga] Update Playlist:", updated);
    yield put(updatePlaylistSuccess(updated));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(updatePlaylistError(e.response?.data));
    }
  }
}

function* DeletePlaylist(action: PayloadAction<string>) {
  try {
    yield call(PlaylistApi.deletePlaylist, action.payload);
    console.log("✅ [Saga] Delete Playlist:", action.payload);
    yield put(deletePlaylistSuccess(action.payload));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(deletePlaylistError(e.response?.data));
    }
  }
}

export function* watchFetchPlaylists() {
  yield takeEvery(fetchPlaylistsRequest.type, FetchPlaylists);
}

export function* watchCreatePlaylist() {
  yield takeEvery(createPlaylistRequest.type, CreatePlaylist);
}

export function* watchUpdatePlaylist() {
  yield takeEvery(updatePlaylistRequest.type, UpdatePlaylist);
}

export function* watchDeletePlaylist() {
  yield takeEvery(deletePlaylistRequest.type, DeletePlaylist);
}

/* 🧩 Root Playlist Saga */
export function* playlistSaga() {
  yield takeEvery(fetchPlaylistsRequest.type, FetchPlaylists);
  yield takeEvery(createPlaylistRequest.type, CreatePlaylist);
  yield takeEvery(updatePlaylistRequest.type, UpdatePlaylist);
  yield takeEvery(deletePlaylistRequest.type, DeletePlaylist);
}

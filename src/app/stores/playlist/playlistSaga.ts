import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";
import { AxiosError } from "axios";
import PlaylistApi, {
  type CreatePlaylistParams,
  type UpdatePlaylistParams,
} from "../../api/playlist";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
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
  fetchPlaylistByIdSuccess,
  fetchPlaylistByIdError,
  fetchPlaylistByIdRequest,
  removeSongFromPlaylistError,
  removeSongFromPlaylistSuccess,
  fetchPlaylistsRequest,
  removeSongFromPlaylistRequest,
} from "./playlistSlice";

function* FetchPlaylists() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    let playlists: SagaReturnType<typeof PlaylistApi.getPlaylists> = yield call(
      PlaylistApi.getPlaylists,
      token
    );

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

    let playlist: SagaReturnType<typeof PlaylistApi.createPlaylist> =
      yield call(PlaylistApi.createPlaylist, action.payload, token);

    yield put(createPlaylistSuccess(playlist));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(createPlaylistError(e.response?.data));
    }
  }
}

function* FetchPlaylistById(action: PayloadAction<string>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const playlist: SagaReturnType<typeof PlaylistApi.getPlaylistById> =
      yield call(PlaylistApi.getPlaylistById, action.payload, token);

    yield put(fetchPlaylistByIdSuccess(playlist));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(fetchPlaylistByIdError(e.response?.data));
    }
  }
}

function* UpdatePlaylist(action: PayloadAction<UpdatePlaylistParams>) {
  try {
    let updated: SagaReturnType<typeof PlaylistApi.updatePlaylist> = yield call(
      PlaylistApi.updatePlaylist,
      action.payload
    );

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

    yield put(deletePlaylistSuccess(action.payload));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(deletePlaylistError(e.response?.data));
    }
  }
}

function* RemoveSongFromPlaylist(
  action: PayloadAction<{ playlistId: string; songId: string }>
) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    yield call(
      PlaylistApi.removeSongFromPlaylist,
      {
        playlistId: action.payload.playlistId,
        songId: action.payload.songId,
      },
      token
    );

    yield put(removeSongFromPlaylistSuccess(action.payload));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(removeSongFromPlaylistError(e.response?.data));
    }
  }
}

export function* watchFetchPlaylists() {
  yield takeLatest(fetchPlaylistsRequest.type, FetchPlaylists);
}

export function* watchCreatePlaylist() {
  yield takeLatest(createPlaylistRequest.type, CreatePlaylist);
}

export function* watchUpdatePlaylist() {
  yield takeLatest(updatePlaylistRequest.type, UpdatePlaylist);
}

export function* watchDeletePlaylist() {
  yield takeLatest(deletePlaylistRequest.type, DeletePlaylist);
}
export function* watchFetchPlaylistById() {
  yield takeLatest(fetchPlaylistByIdRequest.type, FetchPlaylistById);
}
export function* watchRemoveSongFromPlaylist() {
  yield takeLatest(removeSongFromPlaylistRequest.type, RemoveSongFromPlaylist);
}

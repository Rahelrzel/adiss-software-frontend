import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";

import { AxiosError } from "axios";
import albumApi, { type CreateAlbumParams } from "../../api/album";
import {
  createAlbumError,
  createAlbumRequest,
  createAlbumSuccess,
  getAlbumsError,
  getAlbumsRequest,
  getAlbumsSuccess,
} from "./albumSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function* createAlbum(action: PayloadAction<CreateAlbumParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const album: SagaReturnType<typeof albumApi.createAlbum> = yield call(
      albumApi.createAlbum,
      action.payload,
      token
    );

    yield put(createAlbumSuccess(album));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(createAlbumError(e.response?.data?.message || e.message));
    }
  }
}

function* getAlbums() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const albums: SagaReturnType<typeof albumApi.getAlbums> = yield call(
      albumApi.getAlbums,
      token
    );

    yield put(getAlbumsSuccess(albums));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(getAlbumsError(e.response?.data?.message || e.message));
    }
  }
}

export function* albumSaga() {
  yield takeLatest(createAlbumRequest.type, createAlbum);
  yield takeLatest(getAlbumsRequest.type, getAlbums);
}

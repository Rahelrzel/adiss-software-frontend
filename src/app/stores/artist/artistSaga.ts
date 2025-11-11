import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";

import { AxiosError } from "axios";
import artistApi, { type CreateArtistParams } from "../../api/artist";
import {
  createArtistError,
  createArtistRequest,
  createArtistSuccess,
  getArtistsError,
  getArtistsRequest,
  getArtistsSuccess,
} from "./artistSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

function* createArtist(action: PayloadAction<CreateArtistParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const artist: SagaReturnType<typeof artistApi.createArtist> = yield call(
      artistApi.createArtist,
      action.payload,
      token
    );

    yield put(createArtistSuccess(artist));
  } catch (e: any) {
    if (e instanceof AxiosError) {
      yield put(createArtistError(e.response?.data?.message || e.message));
    } else {
      yield put(createArtistError(e?.message || "Failed to create artist"));
    }
  }
}

function* getArtists() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const artists: SagaReturnType<typeof artistApi.getArtists> = yield call(
      artistApi.getArtists,
      token
    );

    yield put(getArtistsSuccess(artists));
  } catch (e: any) {
    if (e instanceof AxiosError) {
      yield put(getArtistsError(e.response?.data?.message || e.message));
    } else {
      yield put(getArtistsError(e?.message || "Failed to fetch artists"));
    }
  }
}

export function* artistSaga() {
  yield takeLatest(createArtistRequest.type, createArtist);
  yield takeLatest(getArtistsRequest.type, getArtists);
}

import { call, put, takeEvery, type SagaReturnType } from "redux-saga/effects";

import { AxiosError } from "axios";

import {
  createGenreError,
  createGenreRequest,
  createGenreSuccess,
  getGenresError,
  getGenresRequest,
  getGenresSuccess,
} from "./genreSlice";

import genreApi, { type CreateGenreParams } from "../../api/genre";
import type { PayloadAction } from "@reduxjs/toolkit";
// --- Create Genre ---
function* createGenre(action: PayloadAction<CreateGenreParams>) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const genre: SagaReturnType<typeof genreApi.createGenre> = yield call(
      genreApi.createGenre,
      action.payload,
      token
    );

    yield put(createGenreSuccess(genre));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(createGenreError(e.response?.data?.message || e.message));
    }
  }
}

// --- Get All Genres ---
function* getGenres() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const genres: SagaReturnType<typeof genreApi.getGenres> = yield call(
      genreApi.getGenres,
      token
    );

    yield put(getGenresSuccess(genres));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(getGenresError(e.response?.data?.message || e.message));
    }
  }
}

// --- Watchers ---
export function* genreSaga() {
  yield takeEvery(createGenreRequest.type, createGenre);
  yield takeEvery(getGenresRequest.type, getGenres);
}

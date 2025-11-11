import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";

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

export function* genreSaga() {
  yield takeLatest(createGenreRequest.type, createGenre);
  yield takeLatest(getGenresRequest.type, getGenres);
}

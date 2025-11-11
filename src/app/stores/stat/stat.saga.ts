import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";
import { AxiosError } from "axios";
import statApi from "../../api/stat";
import {
  getTotalsRequest,
  getTotalsSuccess,
  getTotalsError,
  getSongsByGenreRequest,
  getSongsByGenreSuccess,
  getSongsByGenreError,
  getArtistStatsRequest,
  getArtistStatsSuccess,
  getArtistStatsError,
  getAlbumStatsRequest,
  getAlbumStatsSuccess,
  getAlbumStatsError,
} from "./statSlice";

function* getTotals() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const totals: SagaReturnType<typeof statApi.getTotals> = yield call(
      statApi.getTotals,
      token
    );
    yield put(getTotalsSuccess(totals));
  } catch (e) {
    if (e instanceof AxiosError)
      yield put(getTotalsError(e.response?.data?.message || e.message));
  }
}

function* getSongsByGenre() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const data: SagaReturnType<typeof statApi.getSongsByGenre> = yield call(
      statApi.getSongsByGenre,
      token
    );
    yield put(getSongsByGenreSuccess(data));
  } catch (e) {
    if (e instanceof AxiosError)
      yield put(getSongsByGenreError(e.response?.data?.message || e.message));
  }
}

function* getArtistStats() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const data: SagaReturnType<typeof statApi.getArtistStats> = yield call(
      statApi.getArtistStats,
      token
    );
    yield put(getArtistStatsSuccess(data));
  } catch (e) {
    if (e instanceof AxiosError)
      yield put(getArtistStatsError(e.response?.data?.message || e.message));
  }
}

function* getAlbumStats() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User token not found");

    const data: SagaReturnType<typeof statApi.getAlbumStats> = yield call(
      statApi.getAlbumStats,
      token
    );
    yield put(getAlbumStatsSuccess(data));
  } catch (e) {
    if (e instanceof AxiosError)
      yield put(getAlbumStatsError(e.response?.data?.message || e.message));
  }
}

export function* statSaga() {
  yield takeLatest(getTotalsRequest.type, getTotals);
  yield takeLatest(getSongsByGenreRequest.type, getSongsByGenre);
  yield takeLatest(getArtistStatsRequest.type, getArtistStats);
  yield takeLatest(getAlbumStatsRequest.type, getAlbumStats);
}

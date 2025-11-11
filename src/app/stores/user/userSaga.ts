import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";
import { loginDone, loginError } from "./userSlice";
import { AxiosError } from "axios";
import UserApi, {
  type LoginParameters,
  type SignupParameters,
} from "../../api/user";
import type { PayloadAction } from "@reduxjs/toolkit";
import { showErrorToast } from "../../components/Toast";

function normalizeError(e: unknown) {
  if (e instanceof AxiosError) {
    return { msg: e.response?.data?.message || "Something went wrong" };
  }
  return { msg: "Something went wrong" };
}

function* Login(action: PayloadAction<LoginParameters>) {
  try {
    const res: SagaReturnType<typeof UserApi.login> = yield call(
      UserApi.login,
      action.payload
    );

    if (res.token) localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    yield put(loginDone(res.user));
  } catch (err: unknown) {
    const error = normalizeError(err);
    yield put(loginError(error));
    showErrorToast(error.msg);
  }
}

function* SignUp(action: PayloadAction<SignupParameters>) {
  try {
    const user: SagaReturnType<typeof UserApi.signUp> = yield call(
      UserApi.signUp,
      action.payload
    );

    yield put(loginDone(user));
  } catch (err: unknown) {
    const error = normalizeError(err);
    yield put(loginError(error));
    showErrorToast(error.msg);
  }
}

export function* watchLogin() {
  yield takeLatest("user/loginRequest", Login);
}

export function* watchSignup() {
  yield takeLatest("user/signUpRequest", SignUp);
}

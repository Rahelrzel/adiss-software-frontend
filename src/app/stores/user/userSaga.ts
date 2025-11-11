import { call, put, takeLatest, type SagaReturnType } from "redux-saga/effects";

import { loginDone, loginError } from "./userSlice";
import { AxiosError } from "axios";
import UserApi, {
  type LoginParameters,
  type SignupParameters,
} from "../../api/user";
import type { PayloadAction } from "@reduxjs/toolkit";

function* Login(action: PayloadAction<LoginParameters>) {
  try {
    let user: SagaReturnType<typeof UserApi.login> = yield call(
      UserApi.login,
      action.payload
    );
    if (user.token) {
      localStorage.setItem("token", user.token);
    }

    yield put(loginDone(user));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(loginError(e.response?.data));
    }
  }
}

function* SignUp(action: PayloadAction<SignupParameters>) {
  try {
    let user: SagaReturnType<typeof UserApi.signUp> = yield call(
      UserApi.signUp,
      action.payload
    );

    yield put(loginDone(user));
  } catch (e) {
    if (e instanceof AxiosError) {
      yield put(loginError(e.response?.data));
    }
  }
}

export function* watchLogin() {
  yield takeLatest("user/loginRequest", Login);
}
export function* watchSignup() {
  yield takeLatest("user/signUpRequest", SignUp);
}

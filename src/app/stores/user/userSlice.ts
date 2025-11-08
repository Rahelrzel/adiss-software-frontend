import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginParameters, SignupParameters } from "../../api/user";
import type { ErrorResponse, UserResponse } from "../../types/user.type";

export interface UserStateType {
  loading: boolean;
  error?: ErrorResponse;
  user?: UserResponse;
}

const initialState: UserStateType = {
  loading: false,
  error: undefined,
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginParameters>) => {
      state.loading = true;
      state.error = undefined;
    },
    loginDone: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    loginError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    signUpRequest: (state, _action: PayloadAction<SignupParameters>) => {
      state.loading = true;
      state.error = undefined;
    },
    signUpDone: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    signUpError: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // LOGOUT
    logout: (state) => {
      state.user = undefined;
      state.error = undefined;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginDone,
  loginError,
  signUpRequest,
  signUpDone,
  signUpError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

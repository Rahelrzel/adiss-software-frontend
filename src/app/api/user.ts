import axios from "axios";
import { apiUrl } from "../../config/api";
import type { LoginResponse, UserResponse } from "../types/user.type";

export interface LoginParameters {
  email: string;
  password: string;
}
const login = async ({ email, password }: LoginParameters) => {
  const user = await axios
    .post<LoginResponse>(apiUrl + "/api/auth/login", { email, password })
    .then((res) => res.data);
  return user;
};

export interface SignupParameters {
  username: string;
  email: string;
  password: string;
}
const signUp = async (values: SignupParameters) => {
  const user = await axios
    .post<UserResponse>(apiUrl + "/api/auth/register", values)
    .then((res) => res.data);
  return user;
};

export default { login, signUp };

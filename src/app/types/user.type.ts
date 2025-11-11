export interface UserResponse {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserResponse;
}
export interface ErrorResponse {
  msg: string;
  field?: string;
}

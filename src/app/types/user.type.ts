export interface UserResponse {
  id: string;
  UserName: string;
  email: string;
  token: string;
}

export interface ErrorResponse {
  msg: string;
  field?: string;
}

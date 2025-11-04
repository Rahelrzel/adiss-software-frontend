export const apiUrl = import.meta.env.VITE_API_BASE_URL;
// export const apiUrl = "http://localhost:3000/api";
export const authHeader = (token: string) => ({
  headers: { authorization: `Bearer ${token}` },
});

import http from "@/utils/http";

export const login = (data) => {
  const url = `/api/user/login`;
  return http.post(url, data);
}

export const logout = () => {
  const url = `/api/user/logout`;
  return http.post(url);
}
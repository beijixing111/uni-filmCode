import http from "@/utils/http";

export const homeData = () => {
  const url = `/api/page/film`;
  return http.get(url);
}

export const homeBanner = () => {
  const url = `/api/page/banner`;
  return http.get(url);
}
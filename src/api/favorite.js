import http from "@/utils/http";

export const addFavorite = (data) => { 
  const apiName = '/api/user/addFavorite'; 
  return http.post(apiName, data)
}

export const cancelFavorite = (data) => { 
  const apiName = '/api/user/cancelFavorite'; 
  return http.post(apiName, data)
}
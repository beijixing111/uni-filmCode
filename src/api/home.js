import http from "@/utils/http";

// const getParamsStr = (obj) => {
// 	let arr = [];
// 	for(let key in obj) {
// 		arr.push(`${key}=${obj[key]}`);
// 	}
// 	return arr.join('&');
// }

export const homeData = (data) => {
	// let paramsStr = getParamsStr(data);
  const url = `/api/page/film`;
  return http.get(url, {params: data});
}

export const getWallPaperList = (data) => {
  const url = `/api/page/wallPaper`;
  return http.get(url, {params: data});
}


export const homeBanner = () => {
  const url = `/api/page/banner`;
  return http.get(url);
}
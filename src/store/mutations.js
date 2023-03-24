
import {cacheLocalUserInfo, cacheFavoriteList, getFavoriteList} from './cache';


// 同步修改state 都是方法
// 第一个参数是state 第二个参数是需要修改的值

export default { 
  login(state, payload){
    console.log("login", state, payload);
    state.userInfo = {
      ...state.userInfo,
      ...payload
    };
    cacheLocalUserInfo(state.userInfo);
    state.favoriteList = getFavoriteList();
  },
  logout(state) {
    state.userInfo = {};
    state.favoriteList = [];
    try {
      uni.removeStorageSync('_userInfo');
    } catch (e) {
      // error
    }
  },
  // cacheFilmList(state, payload){
  //   state.filmList = payload;
  // },
  addFilm(state, payload) {
    state.favoriteList.push(payload);
    cacheFavoriteList(state.favoriteList);
  }, 
  delFilm(state, payload) {
    // console.log(payload);
    let index = state.favoriteList.findIndex(item => item.id === payload.id);
    state.favoriteList.splice(index, 1);
    cacheFavoriteList(state.favoriteList);
  },
  clearFilm(state) {
    // 把过滤之后的数组传进来即可
    state.favoriteList = [];
    cacheFavoriteList([]);
  },
  
}
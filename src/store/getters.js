

export default {
  getFavoriteTotal(state) {
    return state.favoriteList.length;
  },
  getUserIsLogin(state) {
    return !!state.userInfo.token || !!state.userInfo.nickName; 
  }
}
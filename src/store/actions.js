
import * as Api from '../api/favorite';

const runToast = (msg, time = 3) => {
  uni.showToast({
    icon: 'none',
    title: msg,
    duration: time * 1000
  });
}

export default { 
  async addFavorite(store, params) {
    // console.log(params);
    store.commit('addFilm', params);
    let { errorCode, errorMsg } = await Api.addFavorite(params);
    if(errorCode === 0){ 
      runToast(errorMsg || '收藏成功！');
    } else {
      store.commit('delFilm', params);
      runToast(errorMsg || '网络错误！');
    }
  },
  async removeFavorite(store, params) {
    store.commit('delFilm', params);
    let { errorCode, errorMsg } = await Api.cancelFavorite(params);
    if(errorCode === 0){ 
      runToast(errorMsg || '取消收藏成功！');
    } else {
      store.commit('addFilm', params);
      runToast(errorMsg || '网络错误！');
    }
  },
  clearFavorite(store) {
    store.commit('clearFilm');
    runToast('已删除全部收藏！');
  }
}
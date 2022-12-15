export const cacheLocalUserInfo = (info) => {
  try {
    uni.setStorageSync('_userInfo', JSON.stringify(info));
  } catch (e) { }
}

// 缓存收藏列表
export const cacheFavoriteList = (list) => {
  try {
    uni.setStorageSync('_favoriteList', JSON.stringify(list)); 
  } catch (e) { }
}

export const getLocalUserInfo = () => {
  let userInfo = {};
  try{
    let res = uni.getStorageSync('_userInfo');
    // console.log(res);
    if(res) {
      userInfo = JSON.parse(res);
      return userInfo;
    }
  }catch(err) {
    console.log(err);
  }
  return userInfo;
}

export const getFavoriteList = () => {
  let list = [];
  try{
    let res = uni.getStorageSync('_favoriteList');
    // console.log(res);
    if(res) {
      list = JSON.parse(res);
      return list;
    }
  }catch(err) {
    console.log(err);
  }
  return list;
}

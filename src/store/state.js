// import { getStorage } from '../common/storage'; 

import { getFavoriteList, getLocalUserInfo} from './cache';

const userInfo = getLocalUserInfo();

const state = {
  userInfo: userInfo,
  filmList: [], // 已加载的filmList
  favoriteList: (userInfo && userInfo.nickName && userInfo.avatarUrl) ? getFavoriteList() : []
}

export default state;
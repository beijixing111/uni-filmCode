<template >
  <view class="film-item" v-if="film">
    <view class="top" @click="toDetail(film)">
      <image style="width: 100%" :mode="'aspectFill'" :src="film.poster"
      ></image>
      <view class="title">{{film.filmName + film.id}}</view>	
    </view>
    <view class="film-btm">
      <view class="userinfo">
        <image class="img-box" :mode="'aspectFill'" :src="film.mimyz_user.avatar || avatar" />
        <view class="nickname">
          <span>{{film.mimyz_user.nickName}}</span>
        </view>
      </view>
      <view class="done">
        <Favorite :favId='film.id' :favFilmName='film.filmName' :favNum='film.filmHeat' />
      </view>
    </view>
  </view>
</template>

<script> 

import Favorite from '@/components/favorite/index';
export default {
  name: 'film-item',
  components: {
    Favorite
  },
  props: {
    film: Object
  },
  data() {
	  // console.log('film', film);
    return { 
      avatar: 'https://hbimg.huabanimg.com/2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658'
    }
  },
  methods: {
    toDetail(item) {
      const detail = encodeURIComponent(JSON.stringify(item));
      uni.navigateTo({
        url: `/pages/filmDetail/index?detail=${detail}`
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .film-item{
		margin-bottom: 1rpx;
		width: 100%;
		background: #fff;
    border-bottom: 1rpx solid #888;
    &:last-child{
      border: 0;
    }
    .top{
      position: relative;
      height: 360rpx;
      /* margin: 0 30rpx; */
      /* border-radius: 10rpx; */
      overflow: hidden;
      .title{ 
        position: absolute;
        top: 0; left: 0;
        z-index: 2;
        width: 100%;
        padding: 15rpx 30rpx;
        color: #333;
        font-size: 32rpx;
        background: rgba(0, 0, 0, 0.2);
      }
    }
    .film-btm{
      padding: 15rpx 30rpx;
      background: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userinfo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .img-box{
          width: 70rpx;
          height: 70rpx;
          margin-right: 20rpx;
          border-radius: 50%;
          overflow: hidden;
        } 
        .nickname{
          color: #333;
          font-size: 28rpx;
          span{
            margin-right: 15rpx;
          }
        }
      }
      .done{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 30rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
 
	} 
	
</style>
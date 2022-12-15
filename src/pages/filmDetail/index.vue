<template>
	<view class="film-detail"> 
		<view v-if="!loading">
			<view class="video-box">
				<video id="myVideo" class="my-video" :src="filmData.filmUrl" :poster="filmData.poster"
          @error="videoErrorCallback" controls 
				></video>
			</view>
			<view class="film-desc">
        <view class="fav-box">
          <Favorite v-if="filmData" :favId='filmData.id' :favFilmName='filmData.filmName' :favNum='filmData.filmHeat' />
        </view>
        <view class="userinfo">
          <image class="img-box" :mode="'aspectFill'" :src="filmData.mimyz_user.avatar || avatar" />
          <view class="nickname">
            <span>{{filmData.mimyz_user.nickName}}</span>
          </view>
        </view>
        <h3 class="title">名称：{{filmData.filmName}}</h3>  
        <p>类型：喜剧</p>
        <!-- <p>资源类型：{{filmType}}</p> -->
        <p>简介：</p>
        <p class="indent">{{filmData.filmDesc || '无'}}</p>
      </view>
		</view>
	</view>
</template>

<script>
	import Favorite from '../components/favorite/index';
	// const app = getApp();
	export default {
    components: {
      Favorite
    },
		data() {
			return { 
				filmData: null,
				loading: false,
				avatar: 'https://hbimg.huabanimg.com/2dbbc9177be8b9912b2a0d881200dd47ccb84d92710aa-IepOs1_fw658'
			}
		},
		onReady: function(res) {
      // #ifndef MP-ALIPAY
			// this.videoContext = uni.createVideoContext('myVideo');
			// #endif
        
    },
		onLoad(option) { 
			this.filmData = JSON.parse(decodeURIComponent(option.detail));
      console.log(this.filmData);
			uni.setNavigationBarTitle({title: this.filmData.filmName + this.filmData.id});
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style lang="scss" scoped> 
.film-detail{
  min-height: 100vh;
  overflow: auto;
  background: #f8f8f8;
}
.loading-box{
  text-align: center;
  padding: 25rpx 0;
}
.video-box{
	width: 100%;
	max-width: 750px;
	height: 420rpx;
	.my-video{
		height: 420rpx;
		width: 100%;
	}
}
.userinfo{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15rpx;
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
.film-desc{
  padding: 20rpx;
  padding-bottom: 60px; 
  position: relative;
  
  .title{
    font-size: 32rpx; font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }
  .fav-box{
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    display: flex;
    justify-content: flex-end;
    /* align-items: center; */
  }
  p{
    font-size: 28rpx; color: #888;
    line-height: 1.6;
    margin-bottom: 10rpx;
    &.indent{
      text-indent: 60rpx;
    }
  }
}
</style>

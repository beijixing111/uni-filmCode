<template>
  <view class="banner">
    <view class="banner-container"> 
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" :indicator-active-color="indicatorActiveColor">
				<swiper-item v-for="banner in list" :key="banner.id" >
					<view class="swiper-item" @click="toLanding(banner.id)">
            <image style="width: 100%" :mode="'aspectFill'" :src="banner.bannerUrl"
            ></image>
          </view>
				</swiper-item>
			</swiper>
    </view>
  </view>
</template>
<script>
export default {
  name: 'banner',
  props: {
    list: Array
  },
  data() {
    return {
      indicatorDots: true,
      indicatorActiveColor: '#fff',
      autoplay: true,
      interval: 2000,
      duration: 500,
    }
  },
  methods: {
    toLanding(id) {
      uni.navigateTo({
        url: `/pages/landing/index?id=${id}`,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  height: 360rpx;
}
  .banner-container {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 360rpx;
	}
	.swiper-item {
		display: block;
		height: 100%;
		line-height: 100%;
		text-align: center;
	}
</style>
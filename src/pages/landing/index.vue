<template>
	<view class="landing" v-if="landingData"> 
    <view class="desc">
      <view v-for="img in landingData.imgages" :key="img.id" class="img-box">
        <image @click="previewImage" style="width: 100%" class="img-sty" :mode="'aspectFill'" :src="img.url"
      ></image>
      </view>
      <view class="p">{{landingData.desc}}</view>
    </view>
    <view class="video">
      <!-- <video> -->
    </view>
    <view class="end"></view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				title: '',
        picUrl: 'https://s3.bmp.ovh/imgs/2023/02/08/714a1efeb76cd58c.png',
        landingData: null, 
			}
		},
		onLoad(option) { 
      // console.log(option); 
      this.getLandingData(option.id);
		},
		methods: {
      async getLandingData (id) {
        this.loading = true;
        try{
          // let landingData 
          let title = '阿凡达2';  
          uni.setNavigationBarTitle({title});
          this.landingData = {
            title: '阿凡达2',
            desc: '阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2阿凡达2。',
            imgages: [
              {
                id: 1,
                url: this.picUrl
              }
            ],
            videoUrl: ''
          }
          this.loading = false;
        }catch(err) {
          console.log(err);
        }
      },
      previewImage(){
        uni.previewImage({
          current: 0,
          urls: [this.picUrl]
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
	.landing { 
    padding: 20rpx 15rpx;
    .title{
      font-size: 34rpx;
      font-weight: bold;
      padding: 15rpx 0;
      text-align: center; 
    }
    .desc{
      padding: 30rpx 0rpx;
      .img-box{
        margin-bottom: 15rpx;
      }
      .img-sty{
        border-radius: 20rpx;
      }
      .p{
        text-indent: 60rpx;
        line-height: 1.5;
        font-size: 30rpx;
        color: #666;
      }
     
    }
	}
</style>

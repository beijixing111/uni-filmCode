<template>
  <view class='scan-result' v-show='result'>
    <view v-if="resultType === 'img'" class='result-img'>
      <image :src="result" mode="aspectFit" @load="loadImg"></image>
    </view>
    <view else class='result-other'>
      <view class='result-label'>扫码结果：</view>
      <view class='result-box'>
        <text class='result-text' user-select>{{result}}</text> 
      </view>  
      <button class="copy-btn" @click="handleCopyUrl" :data-text="result">复制结果</button>
    </view>
  </view>
</template>

<script>

export default {
  name: 'scan',
  data() {
    return {
      result: '',
      resultType: ''
    }
  },
  onLoad(option) {
    console.log(option);  
    this.result = decodeURIComponent(option.result);
    this.resultType = option.resultType;
  },
  methods: {
    loadImg(r) {
      console.log(r);
    },
    handleCopyUrl(e) {
      // console.log(e);
      let urlText = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: urlText,
        success(res) {
          console.log(res);
          uni.showToast({
            icon: 'none',
            title: '复制成功'
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .result-img{
    width: 100%; height: auto; min-height: 600rpx;
  }
  .result-other{
    padding: 0 30rpx; background: #fff;
  }
  .result-other .result-label{
    font-size: 32rpx; text-align: left;
    padding: 20rpx 0; border-bottom: 1rpx dashed #cdcdcd;
  }
  .result-other .result-box{
    padding: 20rpx 0; margin-bottom: 20rpx;
  }
  .result-other .result-box .result-text{
    color: #f27e7e; font-size: 28rpx; word-break: break-all;
  }
  .copy-btn{ 
    background: #f46b84;
    color: #fff;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50rpx;
  }
</style>
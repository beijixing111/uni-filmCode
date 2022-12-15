<template lang="">
  <view>
    <view class="test">测试</view>
    <van-cell title="单元格" value="内容" />
  </view>
</template>
<script>
import VanCell from '@/wxcomponents/@vant/weapp/cell/index';
export default {
  components: {
    VanCell
  }
  
}
</script>
<style lang="scss" scoped>
  $color: red;
  .test{
    color: $color;
    font-size: 40rpx;
  }
</style>
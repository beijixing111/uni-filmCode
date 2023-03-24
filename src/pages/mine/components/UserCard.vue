<template>
  <view class="userinfo-box">
    <view class="le">
      <image class="avatar" :mode="'aspectFill'" :src="userInfo.avatarUrl || defaultAvatar "
      ></image>
      <view class="info">
        <view class="nickname">{{userInfo.nickName}}</view>
      </view>
    </view>
    <view class="rig" > 
      <button class="btn" @click="login" v-if="!isLogin" type="primary" size="small">登 录</button>
      <button class="btn" @click="logout" v-else="isLogin" type="primary" size="small">退 出</button>
    </view>

    <!-- <view>
			<button type="primary" open-type="getUserInfo" 
			@getuserinfo="getUserInfo">获取用户信息</button>

			<button type="primary" open-type="chooseAvatar" 
			@chooseavatar="chooseAvatar">获取用户头像</button> 
		</view> -->
  </view>
</template>

<script> 
export default {
  props: { 
    userInfo: Object
  },
  data() {
    return {
      defaultAvatar: require('static/avatar/default_avatar.png'),
      isLogin: this.$store.getters.getUserIsLogin
    }
  },
  created() {
    // console.log(this.$store.getters.getUserIsLogin, this.isLogin);
  },
  watch: {
    '$store.getters.getUserIsLogin'(newV, oldV){
      console.log(newV);
      this.isLogin = newV;
    }
  },
  methods: {
    login() {
      this.$emit('login');
    },
    logout() {
      this.$emit('logout');
    }
  }
}
</script>
<style lang="scss" scoped>
  .userinfo-box{
    padding: 20rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .le{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .avatar{
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        border: 1rpx solid #f3f3f3;
        margin-right: 20rpx;
        overflow: hidden;
      }
      .info{
        display: flex;
        justify-content: center;
        align-items: center;
        .nickname{
          font-weight: bold;
          font-size: 36rpx;
          color: #666;
        }
      }
    }
  }
  .btn{
    background: #f46b84;
    line-height: 2;
    padding-left: 20rpx;
    padding-right: 20rpx;
    font-size: 30rpx;
  }
</style>
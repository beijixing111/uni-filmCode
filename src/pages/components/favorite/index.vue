<template>
  <view class="fav-box">
    <!-- <van-icon @click="onFavorite" size="26px" name="star-o" :color="isFav ? '#f46b84' : '#ccc'"/> -->
	<text @click="onFavorite" v-show="!isFav" class="sty">☆</text>
	<text @click="onFavorite" v-show="isFav" class="sty-red">★</text> 
    <text class="tnum" v-show="allfavNumber">{{ allfavNumber }}</text>
  </view>
</template>

<script>
// import VanIcon from "@/wxcomponents/@vant/weapp/icon/index";
// vant ui 在app 开发中不支持 
export default {
  components:{
    // VanIcon 
  },
  props: {
    favId: Number,
    favFilmName: String,
    favNum: {
      type: Number,
      default: 0
    },
  },
  data() {
    return { 
      favNumber: this.favNum,
    }
  }, 
  computed: {
    isFav() {
      let index = this.getIndex(); 
      return index > -1;
    },
    allfavNumber() {
      let index = this.getIndex();
      if(index > -1) { 
        return this.favNumber + 1; 
      } 
      return this.favNumber;
    }
  },
  methods: {
    getIndex() {  
      let favoriteList = this.$store.state.favoriteList || [];
      if(favoriteList.length === 0){
        return -1;
      }
      return favoriteList.findIndex(item => item.id === this.favId);
    },
    onFavorite() {
      if(!this.$store.getters.getUserIsLogin){
        return uni.showModal({
          title: '提示',
          content: '未登录，前去登录？',
          confirmText: "去登录",
          confirmColor: '#f46b84',
          success: res => {
            if (res.confirm) {
              uni.switchTab({url: "/pages/mine/index"});
            }
          }
        });
      } 
      let item = {
        id: this.favId,
        filmName: this.favFilmName,
      }
      let typeName = !this.isFav ? 'addFavorite' : 'removeFavorite';
      this.$store.dispatch(typeName, item);
    }
  }
}

</script>

<style lang="scss" scoped>
$favColor: #f46b84;
.fav-box{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .tnum{
    color: #888; 
    font-size: 32rpx;
    margin-left: 10rpx;
    margin-top: 6rpx;
  }
  .sty{
	  color: #ccc;
	  font-size: 26px;
  }
  .sty-red{
	  font-size: 26px;
	color: $favColor;
  }
}

</style>
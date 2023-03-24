<template>
	<view class="user-center">  
    <user-card :userInfo="{avatarUrl, nickName}" 
			@login="onLogin" @logout="onLogOut" />

		<view class="group-bg">
			<van-cell-group >
				<van-cell size="large" title="收藏" :value="starCount" is-link >
					<van-icon slot="icon" size="18px" name="star-o" color="#f46b84" style="margin-right: 10rpx" />
				</van-cell>
				<van-cell size="large" title="扫一扫" @click="handleScan" is-link>
					<van-icon slot="icon" size="18px" name="scan" color="#f46b84" style="margin-right: 10rpx" />
				</van-cell>
				<van-cell size="large" title="设置" @click="goWriteInfo('edit')" is-link >
					<van-icon slot="icon" size="18px" name="setting-o" color="#f46b84" style="margin-right: 10rpx" />
				</van-cell>
				<van-cell size="large" title="壁纸" @click="goToWallpaper" is-link >
					<van-icon slot="icon" size="18px" name="setting-o" color="#f46b84" style="margin-right: 10rpx" />
				</van-cell>
			</van-cell-group>
			<!-- <button class="btn" @click="goToWallpaper" type="primary" size="small">壁 纸</button> -->
		</view>
		
	</view>
</template>

<script> 
import UserCard from './components/UserCard';
import VanCell from "@/wxcomponents/@vant/weapp/cell/index";
import VanCellGroup from  "@/wxcomponents/@vant/weapp/cell-group/index";
import VanIcon from "@/wxcomponents/@vant/weapp/icon/index";
export default {
	name: 'mine',
	components: {
		UserCard,
		VanCell,
		VanCellGroup,
		VanIcon
	},
	data() {
		return {   
			avatarUrl: '',
			nickName: ''
		}
	},
	onLoad() {
		this.getLocalUserInfo(); 
	},
	onShow() {
		this.getLocalUserInfo();
	},
	computed: {
		starCount() {
			return this.$store.getters.getFavoriteTotal || '';
		}
	},
	methods: { 
		getUserInfo(e) {
			console.log(e);
			this.user = e.detail.userInfo;
			console.log(this.user);
		},  
		onLogin() { 
			this.getInfo(); 
			// this.goWriteInfo();
		},
		async getSessionKeyAndOpenid(code) {
			try{

			}catch(err){
				console.log(err);
			}
		},
		goSetInfo(data) {
			if(data.userInfo.nickName === '微信用户'){
				this.goWriteInfo();
			}else {
				this.avatarUrl = data.userInfo.avatarUrl;
				this.nickName = data.userInfo.nickName;
				this.$store.commit('login', data.userInfo);
			}
		},
		getLocalUserInfo(){
			let userInfo = this.$store.state.userInfo;
			this.avatarUrl = userInfo.avatarUrl || '';
			this.nickName = userInfo.nickName || ''; 
		},
		getInfo() {
			if(uni.getUserProfile) {
				uni.getSetting({
					success: (res) => {
						console.log(res)
						if(res.authSetting['scope.userInfo']) {
							uni.getUserProfile({
								desc: "页面显示",
								success: (res) => {
									this.goSetInfo(res);
								},
								complete: (re) => {
									console.log('getUserProfile', re);
								}
							});
						}
					}
				}) 
				
			} else {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						// console.log('用户昵称为：', infoRes);
						this.goSetInfo(infoRes);
					}
				});
			}
		},
		goWriteInfo(type = ''){
			if(type === 'edit'){ 
				let str = encodeURIComponent(JSON.stringify({avatarUrl: this.avatarUrl, nickName: this.nickName}));
				type = `?userInfo=${str}`;
			}
			uni.navigateTo({
				url: '/pages/userinfo/index' + type 
			});
		},
		onLogOut() {
			uni.showModal({
				content: '确定要退出吗？',
				success: res => {
					if (res.confirm) {
						this.$store.commit('logout');
						this.avatarUrl = '';
						this.nickName = '';
					}
				}
			})
		},
		handleScan(){
			uni.scanCode({
				success: (res) => {
					console.log(res);
					let restype = null;
					let reg = /\.(jpe?g|png|gif)$/i;
					if (res.result.indexOf('http') !== -1) {
						restype = "url";
						if (reg.test(res.result)) {
							restype = 'img';
						}
					} else {
						restype = "other";
					}
					uni.navigateTo({
						url: '/pages/scan/index?result=' + encodeURIComponent(res.result) + '&resultType=' + restype
					});
				}
			});
		},
		goToWallpaper(){
			uni.navigateTo({url: '/wallpaper/pages/home/index'});
		}
	}
}
</script>

<style lang="scss" scoped>
	.user-center { 
		padding: 30rpx 0;
		min-height: 100vh;
		background: #f8f8f8;
		box-sizing: border-box;
		.group-bg{ 
			margin-top: 30rpx;
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

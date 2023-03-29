<template> 
	<view class="user-center">  
		<StatusBar :height="statusbarHei" bgColor="#f8f8f8" />
		<view class="top-panel">
			<user-card :userInfo="{avatarUrl, nickName}"
				@login="onLogin" @logout="onLogOut" />
		</view>
		<view class="group-bg">
			<!-- <van-cell-group >
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
			</van-cell-group> -->
			<view>
				<uni-list>
					<uni-list-item showArrow clickable
						title="收 藏"
						:show-extra-icon="true"
						:extra-icon="{color: '#f46b84',size: '26',type: 'star'}"
						@click="handleFav" 
					>
						<template #footer>
							<text class="rig-txt">{{starCount}}</text>
						</template>
					</uni-list-item>
					<uni-list-item showArrow clickable
						title="扫一扫" 
						:show-extra-icon="true"
						:extra-icon="{color: '#f46b84',size: '22',type: 'scan'}" 
						@click="handleScan" 
					/>
					<uni-list-item showArrow clickable
						title="设 置" 
						:show-extra-icon="true"
						:extra-icon="{color: '#f46b84',size: '22',type: 'gear'}"
					/>
					<uni-list-item showArrow clickable
						title="壁 纸"   
						@click="goToWallpaper"
					/>
				</uni-list>
			</view>
			
			<!-- <view style="padding: 10px;">
				<button class="btn"  type="primary" size="small">收藏 {{starCount}}</button>
			</view>
			
			<view style="padding: 10px;">
				<button class="btn" @click="handleScan" type="primary" size="small">扫一扫</button>
			</view>
			<view style="padding: 10px;">
				<button class="btn" type="primary" size="small"></button>
			</view> -->
			
		</view>
		
	</view>
</template>

<script> 
import UserCard from './components/UserCard';
import {logout} from '@/api/user';
import StatusBar from '@/components/status-bar/index';

export default {
	name: 'mine',
	components: {
		UserCard,
		StatusBar,
		// VanCell,
		// VanCellGroup,
		// VanIcon
	},
	data() {
		return {   
			avatarUrl: '',
			nickName: '',
			statusbarHei: 0
		}
	},
	onLoad() {
		this.getLocalUserInfo(); 
	},
	onShow() {
		this.getLocalUserInfo();
		this.statusbarHei = getApp().globalData.statusBarHeight;
	},
	computed: {
		starCount() {
			return this.$store.getters.getFavoriteTotal || '';
		}
	},
	methods: {   
		onLogin() {  
			uni.navigateTo({url: '/pages/login/index'});
		},
		getLocalUserInfo(){
			let userInfo = this.$store.state.userInfo;
			this.avatarUrl = userInfo.avatarUrl || '';
			this.nickName = userInfo.nickName || ''; 
		},
		onLogOut() {
			uni.showModal({
				content: '确定要退出吗？',
				success: async res => {
					if (res.confirm) {
						try{
							let ress = await logout();
							// console.log(res);
							if(ress.errorCode === 0) { 
								this.$store.commit('logout');
								this.avatarUrl = '';
								this.nickName = '';
							}
						} catch(err) {
							console.log(err);
						}
					}
				}
			})
		},
		handleScan(){
			uni.scanCode({
				success: (res) => {
					console.log('handleScan', res);
					console.log('条码类型:', res.scanType);
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
					let resStr = encodeURIComponent(JSON.stringify(res.result));
					console.log("resStr", resStr);
					uni.navigateTo({
						url: '/pages/scan/index?result=' + resStr + '&resultType=' + restype
					});
				},
				fail: (err) => {
					console.log(err);
				}
			});
		},
		goToWallpaper(){
			// uni.navigateTo({url: '/wallpaper/pages/home/index'});
			uni.navigateTo({url: '/pages/nvue/index'});
		},
		handleFav() {
			uni.showToast({
				title: '开发者',
				icon: "none"
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.user-center { 
		height: 100vh;
		background: #f8f8f8;
		box-sizing: border-box; 
		.group-bg{
			margin-top: 30rpx;
		}
	}
	.top-panel{
		padding: 30rpx 0;
	}
	.btn{
	  background: #f46b84;
	  line-height: 2;
	  padding-left: 20rpx;
	  padding-right: 20rpx;
	  font-size: 30rpx;
	}
	.rig-txt{
		display: flex;
		align-items: center;
		font-size: 16px; color: #888;
	}

</style>

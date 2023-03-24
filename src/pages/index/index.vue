<template>
	<view class="home-view" >
		<Banner :list="banners" v-if="banners.length"/>
		<!-- <NewProduct /> -->
		<!-- <view>{{title}}</view> -->
		<view class="film-container">
			<view class="hot">
				<text>热门推荐</text>
			</view>
			<view class="film-list" v-if="filmList.length">
				<FilmItem v-for="film in filmList" :film='film' :key="film.id" />
			</view>

		</view>
		<!-- <button type="primary" @click="onSwitchTab">去个人中心</button>
		<button @click="getToast">获取提示</button> -->
		
	</view>
</template>

<script>
	import { homeData, homeBanner } from '@/api/home';
	import Banner from './components/Banner';
	import FilmItem from './components/FilmItem';
	// const app = getApp();
	export default {
		components: {
			Banner,
			FilmItem
		},
		data() {
			return {
				banners: [],
				filmList: [],
				loading: false, 
				pageSize: 10,
				page: 1
			}
		},
		onLoad() {
			console.log("onLoad");
			this.loadHomeData();
		},
		onShow(){
			// console.log("onShow");
			// this.loadHomeData();
		},

		onPullDownRefresh() {
			console.log('开始下拉刷新');
			this.loadHomeData();
			setTimeout(() => {
				console.log('stopPullDownRefresh');
				uni.stopPullDownRefresh();
			},2000);
		},
		methods: {
			loadHomeData () {
				this.getBanner();
				this.getHomeData(); 
			},
			async getBanner() {
				try {
					const res = await homeBanner();
					if(res.errorCode === 0){
						this.banners = res.data.list;
					}
				} catch(err) {
					console.log(err);
				}
				
			},
			getToast() {
				uni.showToast({
					icon: 'none',
					title: '测试小酱油！'
				});
			},
			onSwitchTab() {
				uni.switchTab({
					url: '/pages/mine/index'
				});
			},
			async getHomeData() {
				const params = {
					page: this.page,
      		pageSize: this.pageSize
				};
				const {errorCode, data} = await homeData();
				if(errorCode === 0) {
					this.filmList = data.filmList;
				}
				console.log(this.filmList[0]);
			},
			getUserInfo(e) {
				console.log(e);
				this.user = e.detail.userInfo;
				console.log(this.user);
			},
			chooseAvatar(e) {
				console.log(e.detail);
				this.avatarUrl = e.detail.avatarUrl;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-view{
		/* height: 100vh; */
		background: #f6f6f6;
	}

	.film-container{
		/* padding: 30rpx0; */
	}
	.hot{
		padding: 30rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

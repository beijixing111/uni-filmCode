<template>
	<view class="home-view" >
		<topTab :tabs="tabs" :statusbarHei="statusbarHei" 
		:current="current" :duration="300" @change="changeTab" @changeIndex="switchTab" @swiperTransition="swiperTransition">
			<template #swiper-item0 >
				<FilmPanel ref="film" :refresherEnabled="!refresherEnabled" />
			</template>
			<template #swiper-item1>
				<WallPaper ref="wallpaper" :refresherEnabled="!refresherEnabled" />
			</template>
			<template #swiper-item2>
				<FuliPanel />
			</template> 
		</topTab>
		
		<!-- <Banner :list="banners" v-if="banners.length"/> -->
		
	</view>
</template>

<script>
	import topTab from '@/components/top-tab/index';
	import FilmPanel from './components/FilmPanel';
	import WallPaper from './components/WallPaper';
	import FuliPanel from './components/FuliPanel';
	// const app = getApp();
	export default {
		components: {
			topTab,
			FilmPanel,
			WallPaper,
			FuliPanel
		},
		data() {
			return {
				statusbarHei: 0,
				current: 0,
				tabs: ['影视', '壁纸', '福利'],
				refresherEnabled: false,
				// banners: [],
			}
		},
		onLoad() {
			console.log("onLoad"); 
		},
		onShow(){
			this.statusbarHei = getApp().globalData.statusBarHeight; 
			console.log("onShow");
			// this.loadHomeData();
		},
		methods: {
			
			switchTab(idx) {
				// console.log(idx);
				this.current = idx; 
			},
			changeTab(e){
				// console.log(e);
				this.current = e.detail.current;
				if(this.current === 0){
					this.$refs.film.getRequest();
				}
				if(this.current === 1){
					this.$refs.wallpaper.getRequest();
				}
			}, 
			swiperTransition(bool){
				// console.log(bool);
				this.refresherEnabled = bool;
			}
			// onSwitchTab() {
			// 	uni.switchTab({
			// 		url: '/pages/mine/index'
			// 	});
			// },
			
		}
	}
</script>

<style lang="scss" scoped>
	.home-view{
		/* height: 100vh; */
		background: #f6f6f6;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>

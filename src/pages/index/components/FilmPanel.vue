<template>
	<scroll-view :scroll-y="true" class="film-container"
		:refresher-enabled="refresherEnabled"
		:refresher-triggered="triggered"
		:refresher-threshold="60" 
		refresher-background="#fafafa" 
		@refresherpulling="onPulling"
		@refresherrefresh="onRefresh" 
		@refresherrestore="onRestore" 
		@refresherabort="onAbort"
		>
		<view class="hot" >
			<text>热门推荐</text>
		</view>
		<view class="film-list" v-if="filmList.length">
			<FilmItem v-for="film in filmList" :film='film' :key="film.id" />
		</view>
	</scroll-view>
</template>

<script>
	import FilmItem from './FilmItem';
	import { homeData, } from '@/api/home';
	export default {
		name: 'film-panel',
		props: {
			refresherEnabled: Boolean
		},
		components: {
			FilmItem,
		},
		data() {
			return {
				triggered: false,
				filmList: [],
				loading: false, 
				pageSize: 10,
				page: 1,
			}
		},
		created(){
			this.getHomeData();
		},
		methods: {
			getRequest() {
				if(this.filmList.length == 0){
					this.getHomeData();
				}
			},
			onPulling(e){
				// console.log(e);
			},
			onRefresh() {
				// console.log("onRefresh");
				if (this.triggered) return;
				this.triggered = true;
				setTimeout(() => {
					// this.triggered = false;
					this.getHomeData();
				}, 1500)
				
			},
			onRestore() {
				this.triggered = false; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("下拉刷新被中止");
				this.triggered = false;
			},
			async getHomeData() {
				const params = {
					page: this.page,
					pageSize: this.pageSize
				};
				try{
					let res = await homeData(params); 
					const {errorCode, data} = res;
					if(errorCode === 0) {
						this.filmList = data.filmList;
					} 
					
				}catch(err) { 
					console.log(err);
				}finally{
					this.triggered = false;
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.film-container{
		/* padding: 30rpx0; */
		height: 100%;
	}
	.hot{
		padding: 30rpx;
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}
</style>
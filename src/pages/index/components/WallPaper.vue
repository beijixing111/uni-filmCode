<template>
	<scroll-view scroll-y="true" class="film-container"
		:refresher-enabled="refresherEnabled"
		:refresher-triggered="triggered"
		:refresher-threshold="60" 
		refresher-background="#fafafa" 
		@refresherpulling="onPulling"
		@refresherrefresh="onRefresh" 
		@refresherrestore="onRestore" 
		@refresherabort="onAbort"
		> 
		<view class="paper-wraper">
			<view v-if="dataList.length === 0">
				<view class="empty">
					<text class="empty-txt">空空如也！</text>
				</view>
			</view>
			<view class="">
				<view type="line" class="paper-item" v-for="item in dataList" :key="item.id">
					<uni-card  margin="0px" shadow="none" >
						<template #title>
							<view class="topinfo">
								<view class="le">
									<image class="avatar" mode="aspectFill"  :src="item.avatar"
									></image>
									<text class="name">{{item.nickName}}</text>
								</view>
								<view class="rig">
									<uni-icons type="bottom" @click="openPopup" size="20" color="#999"></uni-icons>
								</view>
							</view>
						</template>
						<uni-grid :column="3" borderColor="#fff">
							<uni-grid-item v-for="(pic, index) in item.pictures" :index="index" :key="pic.id" style="overflow: hidden;">
								<view class="img-item" @click="()=>previewImage(item.pictures, index)">
									<image style="width: 100%;" lazy-load mode="aspectFill" :src="pic.url"
									></image>
								</view>
							</uni-grid-item>
						</uni-grid>
						<view slot="actions" class="card-actions">
							<view class="card-actions-item" @click="actionsClick('点赞')">
								<uni-icons type="heart" size="18" color="#999"></uni-icons>
								<text class="card-actions-item-text">点赞</text>
							</view>
							<view class="card-actions-item" @click="actionsClick('评论')">
								<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
								<text class="card-actions-item-text">评论</text>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</view>
		 
	</scroll-view>
</template>

<script>
	import { getWallPaperList } from '@/api/home';
	export default {
		name: 'wall-paper', 
		props: {
			refresherEnabled: Boolean,
		},
		data() {
			return {
				triggered: false,
				dataList: [], 
				pageSize: 10,
				page: 1,
				show: false,
			}
		},
		created() {
			// this.triggered = true;
			// this.getDataList();
		},
		onShow() {
			console.log("onShow");
		},
		methods: {
			getRequest() { 
				if(this.dataList.length == 0){
					this.getDataList();
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
					this.getDataList();
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
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				});
			},
			previewImage(arr, idx){
				// console.log(arr);
				let urls = arr.map(item => item.url);
				// uni.navigateTo({
				// 	url: '/pages/nvue/index?picUrl=' + encodeURIComponent(urls[idx])
				// });
				uni.previewImage({
					current: idx,
					urls: urls,
					indicator: true,
				});
			},
			async getDataList() {
				const params = {
					page: this.page,
					pageSize: this.pageSize
				};
				try{
					const {errorCode, data} = await getWallPaperList(params);
					if(errorCode === 0) {
						this.dataList = data.dataList;
					}
				}catch(err) {
					// console.log(err);
				}finally{
					this.triggered = false;
				}
			},
			openPopup(){
				this.$refs.popup.open('center');
			},
			changePopup(e){
				console.log(e);
				this.show = e.show;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.film-container{
		/* padding: 30rpx0; */
		height: 100%;
	}
	.empty{
		text-align: center;
		padding: 20rpx 0; 
		.empty-txt{
			font-size: 26rpx;
			color: #999;
		}
	}
	.paper-item{
		margin-bottom: 20rpx;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.topinfo{
		height: 80rpx; 
		padding: 10rpx 20rpx 0;
		display: flex;
		flex: 1;
		justify-content: space-between; 
		align-items: center;
		.le{
			display: flex;
			justify-content: flex-start; 
			align-items: center;
			flex: auto;
			.avatar{
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				overflow: hidden;
				border: 0;
			}
			.name{
				font-size: 30rpx;
				color: #888;
				margin-left: 10rpx;
			}
		}
		.rig{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100rpx;
			height: 80rpx;
		}
	}
	.paper-wraper{ 
		padding: 20rpx 0;
		.img-item{
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: 10rpx;
		}
		.uni-grid-item{
			overflow: hidden;
			box-sizing: border-box; 
		}
	}
	.card-actions{
		display: flex;
		width: 100%;
		height: 80rpx;
		
	}
	.card-actions-item{
		display: flex;
		flex: 1; 
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #888;
	}
</style>
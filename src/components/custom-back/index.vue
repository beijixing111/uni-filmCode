<template>
	<view class="custom-back" :style="{top: topVal + 'px'}" @click="goBack">
		<uni-icons type="back" :size="size" :color="color" />
	</view>
</template>

<script>
	export default {
		name: 'custom-back',
		props: {
			topVal: {
				type: Number,
				default: 0
			},
			color: {
				type: String,
				default: 'fafafa'
			},
			size: {
				type: [String, Number],
				default: 30
			},
			backNum: {
				type: Number,
			},
			backUrl: {
				type: String,
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				if(this.backUrl){
					uni.navigateTo({
						url: this.backUrl
					});
					return;
				}
				let delta = this.backNum || 1;
				uni.navigateBack({delta});
			}
		}
	}
</script>

<style scoped>
	.custom-back {
		position: fixed;
		left: 20rpx;
		z-index: 10;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}
</style>
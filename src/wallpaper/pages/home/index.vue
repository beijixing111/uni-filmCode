<template>
	<view class="wallpaper">
		<image @click="previewImage" class="imgsty" :mode="'aspectFill'" :src="picUrl"></image>
		<view class="back" @click="goBack" :style="{left: rectLeft, top: rectTop}">
			<van-icon size="30px" name="arrow-left" color="#fff" />
		</view>
	</view>
</template>

<script>
	// import VanIcon from "@/wxcomponents/@vant/weapp/icon/index";
	export default {
		components: {
			// VanIcon
		},
		data() {
			return {
				rectTop: 0,
				rectLeft: 0,
				picUrl: 'https://s3.bmp.ovh/imgs/2023/02/08/714a1efeb76cd58c.png',
			}
		},
		onLoad(option) {
			// console.log(option); 
			let rect = uni.getMenuButtonBoundingClientRect();
			this.rectTop = rect.top + 'px';
			this.rectLeft = 15 + 'px';
			// console.log(rect);
		},
		methods: {
			previewImage() {
				uni.previewImage({
					current: 0,
					urls: [this.picUrl]
				});
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wallpaper {
		width: 100vw;
		height: 100vh;

		/* background: pink; */
		.imgsty {
			width: 100%;
			height: 100%;
			display: block;
		}
	}

	.back {
		position: fixed;
		z-index: 10;
		width: 50rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
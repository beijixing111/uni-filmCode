<template>
	<view class="tabs-view" >
		<view class="fixtop">
			<slot name="statusbar"><view :style="{height: statusbarHei + 'px'}"></view></slot>
			<view class="tabs-box" :style="{top: statusbarHei + 'px'}">
				<!-- <scroll-view class="tabs" scroll-x="true">
					<view class="tabs-item" v-for="(item, idx) in tabs" :key="item" @click="() => switchTab(idx)">
						<text :class="['item-sty', current === idx ? 'actived' : '']">{{item}}</text>
					</view>
				</scroll-view> -->
				<slot>
					<view class="tabs" >
						<view class="tabs-item" v-for="(item, idx) in tabs" :key="item" @click="() => switchTab(idx)">
							<text :class="['item-sty', currentIndex === idx ? 'actived' : '']">{{item}}</text>
						</view>
					</view>
				</slot>
			</view>
		</view>
		<view class="swiper-box" :style="{'padding-top': (statusbarHei + 40) + 'px'}">
			<swiper class="swiper" :current="currentIndex" :duration="duration" 
				@change="changeTab"
				@transition="transition"
				@animationfinish="animationfinish"
				>
				<!-- <swiper-item name="swiper-item"></swiper-item> -->
				<swiper-item v-for="(item, idx) in tabs" :key="item">
					<slot :name="'swiper-item'+idx">{{item}}</slot>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabs: Array,
			statusbarHei: {
				type: Number,
				default: 0
			},
			current: {
				type: Number,
				default: 0
			},
			duration: {
				type: Number,
				default: 300
			}
		},
		data() {
			return {
				currentIndex: this.current,
			}
		},
		methods: {
			switchTab(idx) {
				this.currentIndex = idx;
				this.$emit('changeIndex', idx);
			},
			changeTab(e){
				// console.log(e);
				this.currentIndex = e.detail.current;
				this.$emit('change', e);
			},
			transition(e){
				// console.log(e.detail.dx, e.detail.dy);
				let detail = e.detail;
				this.$emit('swiperTransition', Math.abs(detail.dx) > Math.abs(detail.dy));
			},
			animationfinish() {
				this.$emit('swiperTransition', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs-view{ 
		background: #f6f6f6;
	}
	.fixtop{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background-color: #fff;
		border-bottom: 1rpx solid #c2c2c2;
		z-index: 9999;
	}
	.tabs-box{
		width: 100%;
		// background-color: #fff;
		border-bottom: 1rpx solid #fafafa;
		z-index: 9999;
	}
	.tabs{
		height: 40px;
		white-space: nowrap;
		width: 100%; 
		padding: 0 20rpx;
		box-sizing: border-box;
		text-align: center;
	}
	.tabs-item{
		min-width: 70rpx;
		height: 40px;
		padding: 0rpx 15rpx;
		display: inline-block;
		.item-sty{
			font-size: 30rpx;
			display: inline-block;
			height: 40px;
			line-height: 80rpx;
			color: #666;
		}
		.item-sty.actived{
			font-size: 36rpx;
			font-weight: 700;
			color: #f46b84;
		}
	}
	.swiper-box{
		padding-top: 82rpx;
		height: 100vh;
		box-sizing: border-box;
	}
	.swiper {
		display: flex;
		flex: 1;
		height: 100%;
		box-sizing: border-box;
	}
	.swiper-item {
		display: block;
		display: flex;
		flex: 1;
		text-align: center;
	}
</style>

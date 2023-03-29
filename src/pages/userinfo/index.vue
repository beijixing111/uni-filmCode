<template>
	<view class="userinfo">
		<view class="box">
			<view class="avatar-wrapper">
				<button type="primary" class="btn" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
					<image class="avatar" :src="avatarUrl || defaultAvatar"></image>
				</button>
			</view>
			<input type="nickname" class="weui-input" :value="nickName" placeholder="请输入昵称" @input="changeVal"
				@change="changeVal" />
		</view>

		<view>
			<button type="primary" @click="saveUserInfo">保 存</button>
		</view>
	</view>
</template>

<script>

	export default {
		components: {

		},
		data() {
			return {
				defaultAvatar: require('static/avatar/default_avatar.png'),
				avatarUrl: '',
				nickName: ''
			}
		},
		onLoad(option) {
			console.log(option);
			if (option && option.userInfo) {
				let userInfo = JSON.parse(decodeURIComponent(option.userInfo));
				this.nickName = userInfo.nickName;
				this.avatarUrl = userInfo.avatarUrl;
			}
		},
		methods: {
			chooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl;
			},
			changeVal(e) {
				console.log("changeVal", e);
				this.nickName = e.target.value;
			},
			saveUserInfo() {
				console.log(this.avatarUrl, this.nickName);
				if (!this.avatarUrl) {
					return uni.showToast({
						icon: 'none',
						title: '请先选择头像'
					});
				}
				if (!this.nickName) {
					return uni.showToast({
						icon: 'none',
						title: '请填写昵称！'
					});
				}
				let userInfo = {
					avatarUrl: this.avatarUrl,
					nickName: this.nickName
				};
				try {
					this.$store.commit('login', userInfo);
					uni.navigateBack(1);
				} catch (e) {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userinfo {
		padding: 40rpx;

		.box {
			margin-bottom: 200rpx;
		}

		.avatar-wrapper {
			width: 140rpx;
			height: 140rpx;
			margin: 0 auto 40rpx;

			.btn {
				background: #f2f5f2;
				padding: 0;
				margin: 0;
				display: block;
				width: 140rpx;
				height: 140rpx;
				outline: none;
				box-shadow: none;
				border: none;
				overflow: hidden;
			}

			.avatar {
				width: 140rpx;
				height: 140rpx;
				overflow: hidden;
			}
		}

		.weui-input {
			display: block;
			height: 80rpx;
			line-height: 80rpx;
			text-align: left;
			padding-left: 20rpx;
			width: 100%;
			border-bottom: 1rpx solid #e8e3e3;
			box-sizing: border-box;
		}
	}
</style>
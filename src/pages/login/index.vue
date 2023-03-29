<template>
	<view class="login">
		<form @submit="submitLogin">
			<view class="form-wrap">
				<view style="margin-bottom: 100rpx;">
					<view class="form-item">
						<input class="uni-input" type="text" name="account" placeholder="用户名/邮箱" />
					</view>
					<view class="form-item ">
						<input class="uni-input" type="text" password maxlength="18" name="password" placeholder="密码" />
					</view>
				</view> 
				<view class="uni-btn">
					<button form-type="submit" class="btn">登 录</button>
				</view>
				<view class="other">
					<uni-link href="#" text="去注册" color="#007BFF" />
					<uni-link href="#" text="忘记密码？" color="#888" showUnderLine="false"/>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import {login} from '@/api/user';
	export default {
		name: "login",
		data() {
			return {
				account: '',
				password: '',
			}
		},
		onLoad() { 
			
		},
		methods: {
			async submitLogin(e) {
				// console.log(e);
				let data = e.detail.value;
				if(this.checkData(data)) {
					try{
						let res = await login(data);
						// console.log(res);
						if(res.errorCode === 0) {
							let userInfo = {
								...res.data.userInfo,
								token: res.data.token
							};
							this.$store.commit('login', userInfo);
							uni.navigateBack();
						}
					}catch(err) {
						console.log(err);
					}
				}
				
				// this.$store.commit('login', data.userInfo);
			},
			checkData(data) {
				if(!data.account) {
					uni.showToast({
						icon: 'none',
						title: '账号不能为空！',
						position:'top'
					});
					return false;
				}
				if(!data.password){
					uni.showToast({
						icon: 'none',
						title: '密码不能为空！',
						position:'top'
					});
					return false;
				}
				return true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		padding: 0rpx 40rpx;
		height: 100vh;
		background: #fff;
		.form-wrap{
			padding-top: 100rpx;
		}
		.form-item{ 
			margin-bottom: 50rpx; 
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
			.uni-input{ 
				display: block;
				height: 100%;
				width: 100%;
				text-align: left;
				padding: 0 18rpx;
				font-size: 36rpx;
				color: #333;
				background: #fff;
				border-bottom: 1rpx solid #ddd;
				box-sizing: border-box;
				&:focus{
					border-bottom: 1rpx solid #f46b84;
				}
			}
		}
		.uni-btn{
			padding-top: 80rpx;
			.btn{
				background: #f46b84;
				color: #fff;
				height: 86rpx;
				border-radius: 43rpx;
			}
		}
	}
	.other{
		padding: 60rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
	}
</style>
<template>
	<view>
		
		<!-- <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta> -->
		<!-- <uni-popup ref="popup" background-color="#fff" @change="changePopup">
			<view class="popup-content">
				<text class="text">功能开发中...</text>
			</view>
		</uni-popup> -->
		<view>
			<button @click="startLuzhi">录制视频</button>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fuli-panel',
		data() {
			return {
				title: 'Fuliii',
				cmr: null
			}
		},
		mounted() {
			// 获取设备默认的摄像头对象 
			// this.cmr = plus.camera.getCamera();
			// console.log('camera', this.cmr);
		},
		methods: {
			startLuzhi() {
				let cmr = plus.camera.getCamera();
				// cmr.captureImage(successCB, errorCB, options);
				// let res = cmr.supportedImageResolutions[0];
				// let fmt = cmr.supportedImageFormats[0];
				let res = cmr.supportedVideoResolutions[0];
				let fmt = cmr.supportedVideoFormats[0];
				console.log("Resolution: "+res+", Format: "+fmt);
				cmr.startVideoCapture(( path ) => {
						alert( "Capture image success: " + path );  
					},
					( error ) => {
						alert( "Capture image failed: " + error.message );
					},
					{resolution:res,format:fmt}
				);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
<script>
	import {getWinAndSysInfo} from './utils/sys.js';
	export default {
		globalData: {
			windowWidth: 0,
			innerHeight: 0,
			statusBarHeight: 0,
			osName: ''
		},
		onLaunch: function () {
			
			console.log('App Launch')
			this.getSysInfo();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			// this.getItemList();
		},
		methods: {
			async getSysInfo() {
				let info = await getWinAndSysInfo();
				// console.log('App info', info)
				for(let x in info) {
					this.globalData[x] = info[x];
				}
				console.log(this.globalData);
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

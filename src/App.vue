<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			this.getItemList();
		},
		methods: {
			getItemList() {
				console.log("getItemList");
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

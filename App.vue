<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.updateApp()
			if(uni.getStorageSync('carShop')){
				this.$store.replaceState(
				Object.assign(
				{},
				this.$store.state,
				JSON.parse(uni.getStorageSync('carShop'))
				)
				)
			}
			uni.setStorageSync('platform',uni.getSystemInfoSync().uniPlatform)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			updateApp() {
				const updateManager = uni.getUpdateManager();
				
				updateManager.onCheckForUpdate(function (res) {
				  // 请求完新版本信息的回调
				  console.log(res.hasUpdate);
				});
				
				updateManager.onUpdateReady(function (res) {
				  uni.showModal({
				    title: '更新提示',
				    content: '新版本已经准备好，是否重启应用？',
				    success(res) {
				      if (res.confirm) {
				        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
				        updateManager.applyUpdate();
				      }
				    }
				  });
				
				});
				
				updateManager.onUpdateFailed(function (res) {
				  // 新的版本下载失败
				});

			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '/wxcomponents/@vant/weapp/common/index.wxss';
	page {
		background-color: #F0F0F0;
		font-family: MicrosoftYaHeiLight;
	}
</style>
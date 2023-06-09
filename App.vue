<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
	  this.updateApp()
	  if(!this.$store.state.token){
		   this.$store.commit('userLogins')
	  }
	  // this.getUser()
	  // tt.login({
	  //     success(res) {
	  //       console.log(res);
			// 		this.$api
			// 			.userLogin({code:res.code})
			// 			.then(resp => {
			// 		     console.log(resp)
			// 			});
	  //     },
	  //     fail(res) {
	  //       console.log(`login fail: ${JSON.stringify(res)}`);
	  //     }
	  // });
	  
	  // tt.getUserInfo({ 
	  //     success (res) { 
	  //         console.log(`getUserInfo 调用成功 ${res.userInfo}`); 
	  //     }, 
	  //     fail (res) { 
	  //         console.log(`getUserInfo 调用失败`); 
	  //     } 
	  // });
  // tt.getSystemInfo({
  //     success: (res) => {
  //       // 调用this.setData可以进行状态管理
  //       console.log(res)
  //     },
  //   })
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
	methods:{
		updateApp(){
			const updateManager = tt.getUpdateManager()
			
			updateManager.onCheckForUpdate(function (res) {
			  // 请求完新版本信息的回调
			  console.log(res.hasUpdate)
			})
			
			updateManager.onUpdateReady(function () {
			  tt.showModal({
			    title: '更新提示',
			    content: '新版本已经准备好，是否重启应用？',
			    success(res) {
			      if (res.confirm) {
			        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			        updateManager.applyUpdate()
			      }
			    }
			  })
			})
			
			updateManager.onUpdateFailed(function () {
			  // 新版本下载失败
			})
		},
		getUser(){
			let that = this
			tt.login({
			    success(res) {
				 that.code = res.code
				 that.$api
				 	.userLogin({code:res.code})
				 	.then(resp => {
						if(resp.code=='200'){
							  that.$store.commit('updateToken', resp.data)
						}
				  
				 	});
			    },
			    fail(res) {
			      console.log(`login fail: ${JSON.stringify(res)}`);
			    }
			});
		
		},
	}
  }
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '/wxcomponents/@vant/weapp/common/index.wxss';
	body{
		font-family: MicrosoftYaHeiLight;
	}
  // .container {
  //   padding: 15px;
  // }

  // button {
  //   margin-bottom: 15px;
  // }
</style>

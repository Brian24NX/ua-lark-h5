import Vue from 'vue'
import Vuex from 'vuex'
import api from '../fetch/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		token:uni.getStorageSync('token')||'',
		userInfo:{}
	},
    mutations: {
		//相当于同步的操作
		// updateToken(state,payload){
		// 	state.token=payload;
		// 	uni.setStorageSync('token',payload)
		// },
		userLogins(state){
			tt.login({
			    success(res) {
				 console.log(res.code)
				 api
				 	.userLogin({code:res.code})
				 	.then(resp => {
						if(resp.code=='200'){
							  state.token=resp.data
							  uni.setStorageSync('token',resp.data)
						}
				  
				 	});
			    },
			    fail(res) {
			      console.log(`login fail: ${JSON.stringify(res)}`);
			    }
			});
		
		},
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
	}
})
export default store

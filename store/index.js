import Vue from 'vue'
import Vuex from 'vuex'
// import api from '../fetch/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		carShop: []
	},
	mutations: {
		//相当于同步的操作
		addCar(state, item) {
			state.carShop = state.carShop.filter((v) => v.mid != item.mid)
			state.carShop.push(item)
			uni.setStorageSync('carShop', JSON.stringify(state))
		},
		minusCar(state, item) {
			state.carShop = state.carShop.filter((v) => v.mid != item.mid)
			if (item.scalar <= 0) {
				let index = state.carShop.findIndex(value => value.mid == item.mid)
				state.carShop.slice(index, 1)
			} else {
				state.carShop.push(item)
			}
			uni.setStorageSync('carShop', JSON.stringify(state))
		},
		editCar(state, item) {
			state.carShop = state.carShop.filter((v) => v.mid != item.mid)
			state.carShop.push(item)
			uni.setStorageSync('carShop', JSON.stringify(state))
		},
		deleteCar(state, arr) {
			state.carShop = arr
			uni.setStorageSync('carShop', JSON.stringify(state))
		},
		deleteCarAll(state) {
			state.carShop = []
			uni.setStorageSync('carShop', JSON.stringify(state))
		}
	},
	actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
	}
})
export default store
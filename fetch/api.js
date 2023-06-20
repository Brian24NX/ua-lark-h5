import config from './config'
import md5 from 'js-md5'
import i18n from '../locale/index'
let BASE_URL = config.base_url
let secret = config.secret
let appId = 'lark-api'
export function fetchGet(url, params, need_error) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: params,
			method: 'GET',
			header: {
				'timestamp': new Date().getTime(),
				'appId': appId,
				'sign': md5(new Date().getTime() + secret + appId),
				'access_token': `${uni.getStorageSync("token")}`,
				'lang':  i18n.locale
			},
			timeout: 10000,
			success(res) {
				if (res.statusCode === 200) {
					if (res.data.code === '200') {
						resolve(res.data)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						reject(res.data)
					}
				}
			},
			fail(error) {
				console.log(error)
				reject(error)
			}
		})
	})
}

export function fetchPost(url, params, need_error) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: params,
			method: 'POST',
			header: {
				'content-type': 'application/json',
				'timestamp': new Date().getTime(),
				'appId': appId,
				'sign': md5(new Date().getTime() + secret + appId),
				'access_token': `${uni.getStorageSync("token")}`,
			    'lang': i18n.locale
			},
			timeout: 10000,
			success(res) {
				if (res.statusCode === 200) {
					if (res.data.code === '200') {
						resolve(res.data)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						reject(res.data)
					}
				}
			},
			fail(error) {
				console.log(error)
				reject(error)
			}
		})
	})
}

export default {
	// 登录
	userLogin(params) {
		return fetchGet("/ua-material-api/login", params)
	},
	// 登录
	userLogin2(params) {
		return fetchGet("/ua-material-api/logintest", params)
	},
	// 获取物料类型
	getMaterialCategory(data) {
		return fetchGet(`/ua-material-api/app/material/getMaterialCategory/${data.id}`)
	},
	// 获取物料类型
	getMaterialCategory3(data) {
		return fetchGet(`/ua-material-api/app/material/getSearchList3/${data.id}`)
	},
	// 所有搜索条件列表-里面
	getAllMaterialCategory1(data) {
		return fetchGet(`/ua-material-api/app/material/getSearchList1`)
	},
	// 所有搜索条件列表-外面
	getAllMaterialCategory2(data) {
		return fetchGet(`/ua-material-api/app/material/getSearchList2`)
	},
	// 搜索物料列表
	searchMaterial(params) {
		return fetchPost("/ua-material-api/app/material/searchMaterial/page", params, true)
	},
	// 获取店铺列表
	searchStoreList(params) {
		return fetchPost("/ua-material-api/app/store/list", params, true)
	},
	// 申请单提交
	saMaterialAdd(params) {
		return fetchPost("/ua-material-api/app/apply/add", params, true)
	},

	// 获取我的审批列表
	getAllMyApproval(params) {
		return fetchPost(`/ua-material-api/app/apply/get`,params,true)
	},
	// 获取我的审批列表
	updateApply(param) {
		return fetchPost(`/ua-material-api/app/apply/update/${param.id}`,param.params,true)
	},
}
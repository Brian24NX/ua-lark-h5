// import en from './en.json'
// import zhHans from './zh-Hans.json'
// import zhHant from './zh-Hant.json'
// import ja from './ja.json'
// export default {
// 	auto:zhHans,
// 	en,
// 	'zh-Hans': zhHans,
// 	'zh-Hant': zhHant,
// 	ja
// }
import en from './en.json'
import LangChs from './zh-Hans.json'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('system_info', res);
		}
	})
}
	const cur_lang = system_info.language == 'en' ? 'en' :'zh-Hans'
	const i18n = new VueI18n({
		locale: cur_lang || 'zh_CN',  // 默认选择的语言
		messages: {  
				'en': en,
				'zh-Hans': LangChs
			}
	})
	export default i18n

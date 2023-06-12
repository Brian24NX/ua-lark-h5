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
const i18n = new VueI18n({
	locale: "en",
	messages: {
		'en': en,
		'zh-Hans': LangChs
	}
})
export default i18n
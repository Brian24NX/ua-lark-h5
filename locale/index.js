import en from './en.json'
import LangChs from './zh-Hans.json'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: uni.getLocale(),
	messages: {
		'en': en,
		'zh-Hans': LangChs
	}
})
export default i18n
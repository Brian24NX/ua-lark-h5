import App from './App'
// import messages from './locale/index'
import api from './fetch/api.js'
import store from './store/index.js'
// let i18nConfig = {
//   locale: uni.getLocale(),
//   messages
// }
uni.setLocale('en')
import i18n from './locale/index'
// #ifndef VUE3
import Vue from 'vue'
// import VueI18n from 'vue-i18n'
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype._i18n = i18n
// Vue.use(VueI18n)
// const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n,
  store,
  ...App
})
app.$mount()
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'
// import { createI18n } from 'vue-i18n'
// const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(api).use(i18n)
  return {
    app
  }
}
// #endif

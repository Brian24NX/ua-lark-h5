import App from './App'
import api from './fetch/api.js'
import store from './store/index.js'
console.log(uni.getSystemInfoSync())
if(uni.getSystemInfoSync().uniPlatform=="mp-lark"){
	uni.setLocale('en')
}
import i18n from './locale/index'
// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype._i18n = i18n
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
export function createApp() {
  const app = createSSRApp(App)
  app.use(api).use(i18n)
  return {
    app
  }
}
// #endif

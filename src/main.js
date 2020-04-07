// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import i18n from './i18n/index'
import VueI18n from 'vue-i18n'

// 全局引入iu库 vant
import '@/plugins/vant'
// 全局引入rem
import '@/config/rem'
// 全局引入 Reset-css
import 'reset-css'
// 全局引入filter
import '@/config/filter'

// 多语言
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
})

// 显示生产模式的消息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

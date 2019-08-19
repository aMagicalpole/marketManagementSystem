import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/styles/common.css'
import 'normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

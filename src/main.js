import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import vueWaves from './directive/waves/index' // 水波纹指令
import pic from './directive/pic/index' // 错误图片指令

import '@/icons' // icon
import '@/permission' // permission control
import { commons } from '@/apis/comminApi'
import utils from '@/utils/utils'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(vueWaves).use(pic)
// console.log('启动', process.env.VUE_APP_BASE_API, process.env.VUE_APP_FOO_API, axios.defaults.baseURL)
// Vue.prototype.GLOBAL = axios.defaults.baseURL

Vue.prototype.dictionaries = commons
Vue.prototype.utils = utils

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})

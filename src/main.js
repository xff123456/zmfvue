import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//使用懒加载的插件
Vue.use(VueLazyload,{
loading:require('./assets/img/common/zmf.jpg')
})
new Vue({
  router,
  store,
  axios,

  render: h => h(App)
}).$mount('#app')

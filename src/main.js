import Vue from 'vue'
import App from './App.vue'
import io from './common/weapp.socket.io.js'
import router from './router'
import './assets/index.css'

Vue.config.productionTip = false
Vue.prototype.socket = io('http://localhost:8082')

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

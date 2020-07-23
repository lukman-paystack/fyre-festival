import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';
Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'https://fyre.pstk.xyz/api',
  withCredentials: true,
  headers: {Authorization: 'Bearer '+ ( ( localStorage.getItem('authToken') == null) ? '' : localStorage.getItem('authToken'))}
});
Vue.prototype.$http = instance;
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

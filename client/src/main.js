import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import SocialSharing from 'vue-social-sharing'

Vue.config.productionTip = false

Vue.use(SocialSharing)


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

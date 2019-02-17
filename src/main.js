import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {store} from './store/store'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(VueMoment, {});

Vue.config.productionTip = false;

// filters
Vue.filter('capitalize', (value) => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('uppercase', (value) => {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
});

//global components
import Modal from "./components/Modal.vue"
Vue.component('modal', Modal);
import Chart from "./components/Chart.vue"
Vue.component('chart', Chart);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

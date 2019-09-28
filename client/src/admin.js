import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router/admin';
import store from './store';

import './assets/css/common.less';
import './assets/font/iconfont.css';
import plugins from './util'
// 插件引用
Vue.use(plugins)
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
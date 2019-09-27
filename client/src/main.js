import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui'
import router from './router/client';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.less';
import './assets/font/iconfont.css';
import plugins from './util'
// 插件引用
Vue.use(ElementUI)
Vue.use(plugins)


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

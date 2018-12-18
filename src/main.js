// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs';
import $ from 'jquery';
import caret from 'jquery.caret';
import fullCalendar from 'vue-fullcalendar'; // 日历插件
import Util from './api/utils';
import domain from './api/domain';
import pdf from './components/common/pdf';
import FetchLoading from './api/loading.js'
import vuePicturePreview from 'vue-picture-preview'
require('es6-promise').polyfill();
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Util);
Vue.use(fullCalendar);

Vue.component(pdf.name, pdf);
Vue.use(vuePicturePreview);
// Vue.use(vuePicturePreview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// });

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$ = $;
Vue.prototype.caret = caret;
/* eslint-disable no-new */
global.domain = domain;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

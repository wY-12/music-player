import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import "./styles/global.less";
import showMessage from "@/utils/showMessage.js"
import "./mock"
import store from "./store";
import vLoading from "@/directives/loading.js"
Vue.directive("Loading", vLoading)
import "./api/banner";
import "./eventBus"
Vue.prototype.$showMessage = showMessage;
window.showMessage = showMessage;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

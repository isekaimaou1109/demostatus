import Vue from "vue";
import CountryFlag from 'vue-country-flag'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

Vue.config.productionTip = false;

/* add country icon */
Vue.component('country-flag', CountryFlag)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

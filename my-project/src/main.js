import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(ToastPlugin);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#42a5f5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
new Vue({
  el: "#app",
  vuetify,
  ToastPlugin,
  store,
  router,
  components: { App },
  template: "<App/>",
});

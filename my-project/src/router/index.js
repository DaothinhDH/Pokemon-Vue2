import Vue from "vue";
import Router from "vue-router";
import CompList from "../view/CompList.vue";
import compDetails from "./compDetails";
import auth from "./auth";
import cart from "./cart";

Vue.use(Router);

export default new Router({
  mode: "history",  
  routes: [
    {
      path: "/",
      name: "CompList",
      component: CompList,
    },
    ...compDetails,
    ...auth,
    ...cart,
  ],
});

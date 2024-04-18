import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("loggedIn") === "true",
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    // setLoggedIn(state, value) {
    //   state.isLoggedIn = value;
    // },
  },
  actions: {
    // login({ commit }) {
    //   localStorage.setItem("loggedIn", "true"); // Đánh dấu người dùng đã đăng nhập trong LocalStorage
    //   commit("setLoggedIn", true); // Cập nhật trạng thái đăng nhập trong Vuex
    // },
    // logout({ commit }) {
    //   localStorage.setItem("loggedIn", "false"); // Đánh dấu người dùng đã đăng xuất trong LocalStorage
    //   commit("setLoggedIn", false); // Cập nhật trạng thái đăng nhập trong Vuex
    // },
    addToCart({ commit }, product) {
      commit("addToCart", product); // Thực hiện thêm sản phẩm vào giỏ hàng
    },
  },
});

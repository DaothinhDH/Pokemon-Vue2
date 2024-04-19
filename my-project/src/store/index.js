import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    releasePokemon(state, index) {
      state.cart.splice(index, 1);
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit("addToCart", product);
    },
    releasePokemon({ commit }, index) {
      commit("releasePokemon", index);
    },
  },
});

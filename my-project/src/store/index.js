import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const ADD_TO_CART = "ADD_TO_CART";
const RELEASE_POKEMON = "RELEASE_POKEMON";
const SET_CART = "SET_CART";

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    [ADD_TO_CART](state, product) {
      state.cart.push(product);
    },
    [RELEASE_POKEMON](state, index) {
      state.cart.splice(index, 1);
    },
    [SET_CART](state, cartData) {
      state.cart = cartData;
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit(ADD_TO_CART, product);
    },
    releasePokemon({ commit }, index) {
      commit(RELEASE_POKEMON, index);
    },
  },
  getters: {
    totalItemsInCart: (state) => {
      return state.cart.length;
    },
    cartList: (state) => {
      return state.cart;
    },
  },
});

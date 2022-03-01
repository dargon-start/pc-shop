import {getcartList} from "@/network/cart";
const state = {
  cartList: [],
};
const mutations = {
  CartList(state, payload) {
    state.cartList = payload;
  },
};
const actions = {
  async getCartList(context) {
    let result = await getcartList();
    if ((result.data.code = 200)) {
      context.commit("CartList", result.data.data[0]?.cartInfoList || []);
    } else {
      new Error("获取购物车列表失败");
    }
  },
};
const getters = {};
export default {state, mutations, actions, getters};

import Vue from "vue";
import Vuex from "vuex";
import home from "./home/home";
import search from "./search/search";
import detail from "./detail/detail";
import cart from "./cart/cart";
import {getUserInfo, logout} from "../network/home";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: [], //购物车列表
    project: {},
    userInfo: null,
  },
  mutations: {
    addcart(state, project) {
      //如果购物车中存在商品，数量加一
      let oldproject = state.cartList.find((pro) => pro.id == project.id);
      if (oldproject) {
        oldproject.addCartNum += project.addCartNum;
      } else {
        //否则，添加到购物车
        state.cartList.push(project);
      }
      //当强加入购物车的商品
      state.project = project;
    },
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    getProject(context, payload) {
      context.commit("addcart", payload);
    },
    //获取用户信息getUserInfo
    async getUserInfo({commit}, payload) {
      const result = await getUserInfo();
      if (result.data.code == 200) {
        commit("userInfo", result.data.data);
        return "ok;";
      } else {
        return new Error("获取失败");
      }
    },
    //退出登录
    async logout({commit}, payload) {
      const res = await logout();
      if (res.data.code == 200) {
        commit("userInfo", null);
        localStorage.removeItem("token");
      }
    },
  },
  modules: {
    home,
    search,
    detail,
    cart,
  },
});

export default store;

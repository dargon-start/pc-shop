//home模块
import {getTypeNav, getBanner, getfloor} from "../../network/home";
const state = {category: [], banner: [], floor: []};
const mutations = {
  Category(state, category) {
    state.category = category;
  },
  Banner(state, banner) {
    state.banner = banner;
  },
  Floor(state, floor) {
    state.floor = floor;
  },
};
const actions = {
  //三级联动数据
  async getCategory(context) {
    let result = await getTypeNav();
    if (result.data.code == 200) {
      let data = result.data.data;
      data.pop();
      data.pop();
      context.commit("Category", data);
    }
  },
  //获取轮播图数据
  async getBanner(context) {
    let result = await getBanner();
    if (result.data.code == 200) {
      context.commit("Banner", result.data.data);
    }
  },
  //获取floor数据
  async getFloor(context) {
    let result = await getfloor();
    if ((result.data.code = 200)) {
      context.commit("Floor", result.data.data);
    }
  },
};
const getters = {};
export default {state, mutations, actions, getters};

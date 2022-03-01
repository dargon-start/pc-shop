//search模块
import {getSearchInfo} from "@/network/search";
const state = {
  info: {},
};
const mutations = {
  SearchInfo(state, info) {
    state.info = info;
  },
};
const actions = {
  async getSearch(context, payload = {}) {
    const result = await getSearchInfo(payload);
    if (result.data.code == 200) {
      context.commit("SearchInfo", result.data.data);
    }
  },
};
const getters = {
  goodsList(state) {
    return state.info.goodsList;
  },
  attrsList(state) {
    return state.info.attrsList;
  },
  trademarkList(state) {
    return state.info.trademarkList;
  },
};
export default {state, mutations, actions, getters};

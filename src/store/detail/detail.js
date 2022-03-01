import {getGoodInfo, addShopCart} from "@/network/detail";
import {getuuid} from "@/utils/uuid";
const state = {
  GoodInfo: {},
  uuid: getuuid(),
};
const mutations = {
  GoodInfo(state, GoodInfo) {
    state.GoodInfo = GoodInfo;
  },
};
const actions = {
  async getGoodsInfo(context, goodId) {
    const res = await getGoodInfo(goodId);
    if (res.data.code == 200) {
      context.commit("GoodInfo", res.data.data);
    }
  },
  async addShopCart(context, {goodId, goodNum}) {
    let result = await addShopCart(goodId, goodNum);
    if (result.data.code == 200) {
      return "ok";
    } else {
      return new Error("请求失败");
    }
  },
};
const getters = {
  categoryView() {
    return state.GoodInfo.categoryView || {};
  },
  skuInfo() {
    return state.GoodInfo.skuInfo || {};
  },
  spuSaleAttrList() {
    return state.GoodInfo.spuSaleAttrList || [];
  },
};
export default {state, mutations, actions, getters};

import {request} from "./request.js";

export function getcartList() {
  return request({
    url: "/cart/cartList",
    method: "get",
  });
}

//删除商品
export function delgood(skuId) {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
}

//修改选中状态
export function changeStatus(skuId, isChecked) {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
}

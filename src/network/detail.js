import {request} from "./request";

export function getGoodInfo(goodId) {
  return request({
    method: "get",
    url: `/item/${goodId}`,
  });
}

export function addShopCart(GoodId, GoodNum) {
  console.log(GoodId, GoodNum);
  return request({
    method: "post",
    url: `/cart/addToCart/${GoodId}/${GoodNum}`,
  });
}

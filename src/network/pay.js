import {request} from "./request";
export async function submitOrder(tradeNo, data) {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
}

//获取支付信息
export async function getPayInfo(orderId) {
  return request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
}

//获取支付状态
export function getPayStatus(orderId) {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
}

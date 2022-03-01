//home页面的数据请求
import {request} from "./request";
//获取搜索数据
export async function getaddress() {
  return request({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
}

export async function getTrade() {
  return request({
    url: "/order/auth/trade",
    method: "get",
  });
}

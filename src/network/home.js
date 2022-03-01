//home页面的数据请求
import {request} from "./request";
import {requestMock} from "./mockRequest";
//获取三级联动数据
export function getTypeNav() {
  return request({
    url: "/product/getBaseCategoryList",
  });
}

//轮播图数据
export function getBanner() {
  return requestMock({
    url: "/banner",
  });
}
//获取商品数据
export function getfloor() {
  return requestMock({
    url: "/floor",
  });
}

//如果用户登录了，获取用户信息
export async function getUserInfo() {
  return request({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
}

//退出登录
export async function logout() {
  return request({
    url: "/user/passport/logout",
    method: "get",
  });
}

import {request} from "./request";

//获取验证码
export function getcode(phone) {
  return request({
    url: `/user/passport/sendCode/${phone}`,
  });
}

//注册
export function register(data) {
  return request({
    url: "/user/passport/register",
    method: "post",
    data,
  });
}

import {request} from "./request";

export function login(data) {
  return request({
    url: "/user/passport/login",
    method: "post",
    data,
  });
}

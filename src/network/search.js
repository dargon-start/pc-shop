//home页面的数据请求
import {request} from "./request";
//获取搜索数据
export function getSearchInfo(params) {
  return request({
    url: "/list",
    method: "post",
    data: params,
  });
}

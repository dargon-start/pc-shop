import {request} from "./request";
export function getMyorder(page, limit) {
  return request({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
}

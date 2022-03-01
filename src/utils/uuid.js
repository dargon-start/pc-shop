import {v4 as uuidv4} from "uuid";

export function getuuid() {
  let uuid = localStorage.getItem("uu_id");
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("uu_id", uuid);
  }
  return uuid;
}

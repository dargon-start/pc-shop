import axios from "axios";
//引入nprogress和nprogress.css
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
export function request(config) {
  const instance = axios.create({
    baseURL: "http://39.98.123.211/api",
    timeout: 5000,
  });
  //请求拦截器
  instance.interceptors.request.use(
    (config) => {
      //接受到的是请求信息，拦截之后需要返回出去请求信息
      if (store.state.detail.uuid) {
        config.headers.userTempId = store.state.detail.uuid;
      }
      //toke
      try {
        if (localStorage.getItem("token")) {
          config.headers.token = localStorage.getItem("token");
        }
      } catch (error) {
        console.log(error);
      }

      //进度条开始
      nprogress.start();
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  //响应拦截器
  instance.interceptors.response.use(
    (res) => {
      //接受到的是响应数据，拦截之后需要返回出去响应数据
      //进度条结束
      nprogress.done();
      return res;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}

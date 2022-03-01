import axios from "axios";
//引入nprogress和nprogress.css
import nprogress from "nprogress";
import "nprogress/nprogress.css";

export function requestMock(config) {
  const instance = axios.create({
    baseURL: "http://mock",
    timeout: 5000,
  });
  //请求拦截器
  instance.interceptors.request.use(
    (config) => {
      //接受到的是请求信息，拦截之后需要返回出去请求信息
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

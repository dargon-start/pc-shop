import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import TypeNav from "./components/typeNav/typeNav.vue";
import store from "./store/index";
import "./mock/mockServe";
import "swiper/swiper-bundle.css";
import "element-ui/lib/theme-chalk/index.css";
import {
  MessageBox,
  Message,
  FormItem,
  Input,
  Form,
  Button,
  Checkbox,
} from "element-ui";
import vueLazyload from "vue-lazyload";
import lazyImg from "./assets/imgs/lazy.png";
//关闭生产提示
Vue.config.productionTip = false;
//注册全局组件
Vue.use(vueLazyload, {
  loading: lazyImg,
});
//引入组件
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Form);
Vue.use(Button);
Vue.use(Checkbox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(TypeNav.name, TypeNav);
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
}).$mount("#app");

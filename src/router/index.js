import Vue from "vue";
import vueRouter from "vue-router";
import store from "../store/index";

Vue.use(vueRouter);

//重写push和replace
const originalpush = vueRouter.prototype.push;
const originalreplace = vueRouter.prototype.replace;

vueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originalpush.call(this, location, resolve, reject);
  } else {
    originalpush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
vueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originalreplace.call(this, location, resolve, reject);
  } else {
    originalreplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//路由懒加载
const Home = () => import("@/pages/Home/home.vue");
const Login = () => import("@/pages/Login/login.vue");
const Register = () => import("@/pages/Register/register.vue");
const Search = () => import("@/pages/Search/search.vue");
const Detail = () => import("@/pages/Detail/Detail.vue");
const AddCartSuccess = () =>
  import("@/pages/AddCartSuccess/addCartSuccess.vue");
const ShopCart = () => import("@/pages/ShopCart/shopCart.vue");
const Trade = () => import("@/pages/Trade/trade.vue");
const Pay = () => import("@/pages/Pay/pay.vue");
const PaySuccess = () => import("@/pages/PaySuccess/paySuccess.vue");
const Center = () => import("@/pages/Center/center.vue");
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {show: true, auth: false},
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {show: false, auth: false},
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {show: false, auth: false},
  },
  {
    path: "/search/:keyword?",
    name: "search",
    component: Search,
    meta: {show: true, auth: false},
  },
  {
    path: "/detail/:goodsId?",
    name: "setail",
    component: Detail,
    meta: {show: true, auth: false},
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {show: true, auth: true},
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta: {show: true, auth: true},
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    meta: {show: true, auth: true},
    beforeEnter: (to, from, next) => {
      /* must call `next` */
      console.log(from);
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    meta: {show: true, auth: true},
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paySuccess",
    name: "paySuccess",
    component: PaySuccess,
    meta: {show: true, auth: true},
    beforeEnter: (to, from, next) => {
      if (from.path == "/pay") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/center",
    name: "center",
    component: Center,
    meta: {show: true, auth: true},
  },
];

let router = new vueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  },
});

let name = store.state.userInfo?.loginName;
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    //登录后，不能再访问登录页面
    if (to.path == "/login") {
      next("/");
    } else {
      if (name) {
        next();
      } else {
        store
          .dispatch("getUserInfo")
          .then((res) => {
            next();
          })
          .catch((err) => {
            //token失效
            store.dispatch("logout");
            next("/login");
          });
      }
    }
  } else {
    let toPath = to.path;
    if (to.meta.auth) {
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }
  }
});

export default router;

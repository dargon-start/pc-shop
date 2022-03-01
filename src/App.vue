<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Footer from "./components/footer/footer.vue";
import Header from "./components/header/header.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {},
  mounted() {
    //将数据请求放在这里可以减少请求次数，提高性能
    this.$store.dispatch("getCategory");
    (function () {
      var script = document.createElement("script");
      script.src =
        "https://tj-api.caccaa.com/tj?site=5dc9cb69662acf1cb2b7d8dbe4ef29a2";
      document.body.appendChild(script);
    })();
  },
};
</script>

<style>
@import url("./assets/css/base.css");
</style>

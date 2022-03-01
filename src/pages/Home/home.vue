<template>
  <div class="home">
    <type-nav></type-nav>
    <list></list>
    <today-recommend></today-recommend>
    <rank></rank>
    <like></like>
    <floor v-for="(item, index) in floor" :key="index" :list="item"></floor>
    <brand></brand>
  </div>
</template>

<script>
import list from "./childcomponents/list_container.vue";
import TodayRecommend from "./childcomponents/today_recommend.vue";
import rank from "./childcomponents/rank.vue";
import like from "./childcomponents/like.vue";
import floor from "./childcomponents/floor.vue";
import brand from "./childcomponents/brand.vue";
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      loginName: undefined,
    };
  },
  components: {
    list,
    TodayRecommend,
    rank,
    like,
    floor,
    brand,
  },
  mounted() {
    //请求floor数据
    this.$store.dispatch("getFloor");
    //获取用户的信息
    this.$store.dispatch("getUserInfo");
  },

  methods: {},
  computed: {
    ...mapState({
      floor: (state) => state.home.floor,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- categoryName -->
            <li class="with-x" v-if="reqParams.categoryName">
              {{ reqParams.categoryName }}<i @click="removeName">×</i>
            </li>
            <!-- keyword -->
            <li class="with-x" v-if="reqParams.keyword">
              {{ reqParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-if="reqParams.trademark">
              {{ reqParams.trademark.split(":")[1]
              }}<i @click="removeMark">×</i>
            </li>
            <!-- attrInfo -->
            <li
              class="with-x"
              v-for="(item, index) in reqParams.props"
              :key="item"
            >
              {{ item.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @clickTrade="clickTrade"
          @attrInfo="attrInfo"
        ></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isone }" @click="clickOrder(1)">
                  <a>
                    综合
                    <span
                      v-show="isone"
                      class="iconfont"
                      :class="{ 'icon-down': isdesc, 'icon-up': !isdesc }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: istwo }" @click="clickOrder(2)">
                  <a
                    >销量
                    <span
                      v-show="istwo"
                      class="iconfont"
                      :class="{ 'icon-down': isdesc, 'icon-up': !isdesc }"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品数据 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg || '/images/mobile02.png'"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ good.id }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <pageNations
            :pageNo="reqParams.pageNo"
            :pageSize="reqParams.pageSize"
            :total="$store.state.search.info.total"
            :continuous="5"
            @getPageNo="getPageNo"
          ></pageNations>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./searchChild/SearchSelector.vue";
import pageNations from "@/components/pageNations/pageNations.vue";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      reqParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
      curnum: 1,
    };
  },
  components: {
    SearchSelector,
    pageNations,
  },
  beforeMount() {
    Object.assign(this.reqParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.reqInfo();
  },

  computed: {
    ...mapGetters(["goodsList"]),
    isone() {
      return this.reqParams.order.split(":")[0] === "1";
    },
    istwo() {
      return this.reqParams.order.split(":")[0] === "2";
    },
    isdesc() {
      return this.reqParams.order.split(":")[1] === "desc";
    },
  },

  methods: {
    //发送请求，获取数据
    reqInfo() {
      this.$store.dispatch("getSearch", this.reqParams);
    },
    //面包屑的移除事件
    removeName() {
      Object.assign(this.reqParams, {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined,
      });
      //修改路由
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },
    removeKeyword() {
      this.reqParams.keyword = undefined;
      //更新路由
      this.$bus.$emit("clear");
      this.$router.push({ name: "search", query: this.$route.query });
    },
    removeMark() {
      this.reqParams.trademark = undefined;
      //重新请求数据
      this.reqInfo();
    },
    removeAttr(index) {
      //
      this.reqParams.props.splice(index, 1);
      this.reqInfo();
    },
    //点击品牌，发送请求
    clickTrade(mark) {
      this.reqParams.trademark = `${mark.tmId}:${mark.tmName}`;
      this.reqInfo();
    },
    //点击属性
    attrInfo(attr, attrVal) {
      //放入props中的参数
      const req = `${attr.attrId}:${attrVal}:${attr.attrName}`;
      //判断是否在props存在
      if (this.reqParams.props.indexOf(req) === -1) {
        this.reqParams.props.push(req);
      }
      //请求数据
      this.reqInfo();
    },
    clickOrder(num) {
      //判断当前显示的和点击的是否是同一个,并且查看是否是降序
      //如果是则将当前转为升序
      if (num === this.curnum && this.isdesc) {
        this.reqParams.order = `${num}:asc`;
      } else {
        //其他情况都是请求降序
        this.reqParams.order = `${num}:desc`;
      }
      this.curnum = num;
      this.reqInfo();
    },
    getPageNo(pageNo) {
      this.reqParams.pageNo = pageNo;
      this.reqInfo();
    },
  },
  watch: {
    $route() {
      //再次请求清空多余的参数
      Object.assign(
        this.reqParams,
        {
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
        },
        this.$route.params,
        this.$route.query
      );
      this.reqInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
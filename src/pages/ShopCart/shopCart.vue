<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="isChecked($event, item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 加一 -->
            <a class="mins" @click="handlerNum(null, 'sub', item, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerNum($event, 'change', item, $event.target.value)"
            />
            <!-- 减一 -->
            <a class="plus" @click="handlerNum(null, 'add', item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGood(item)">删除</a>
            <br />
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="allChecked && cartList.length > 0"
          @change="CheckedAll($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delSelect()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import brandVue from "../Home/childcomponents/brand.vue";
import { delgood, changeStatus } from "@/network/cart";
export default {
  name: "ShopCart",
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$store.dispatch("getCartList");
    },
    //修改商品数量
    handlerNum(event, type, goods, num) {
      switch (type) {
        case "add":
          num = 1;
          break;
        case "sub":
          num = goods.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            num = num - goods.skuNum;
          }
          break;
      }
      this.$store
        .dispatch("addShopCart", { goodId: goods.skuId, goodNum: num })
        .then((res) => {
          this.getdata();
        });
    },
    //删除商品
    async deleteGood(item) {
      await delgood(item.skuId);
      this.getdata();
    },
    //修改选中的状态
    async isChecked(event, goods) {
      let ischecked = event.target.checked ? 1 : 0;
      await changeStatus(goods.skuId, ischecked);
      this.getdata();
    },
    async delSelect() {
      await new Promise((resolve, reject) => {
        this.cartList.forEach((item) => {
          if (item.isChecked) {
            this.deleteGood(item);
          }
        });
      });
      this.getdata();
    },
    //全选与全不选
    async CheckedAll(event) {
      let checked = event.target.checked ? 1 : 0;
      await new Promise((resolve, reject) => {
        this.cartList.forEach((item) => {
          this.isChecked(event, item);
        });
      });
    },
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cart.cartList,
    }),
    //总价格
    totalPrice() {
      let total = 0;
      this.cartList.forEach((item) => {
        if (item.isChecked) {
          total += item.skuNum * item.skuPrice;
        }
      });
      return total;
    },
    allChecked() {
      return this.cartList.every((item) => item.isChecked);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            color: #666;
            width: 6px;
            padding: 6px 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            color: #666;
            width: 6px;
            padding: 6px 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
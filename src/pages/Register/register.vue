<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>

      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-width="80px"
        class="demo-ruleForm"
        style="width: 400px; margin: 20px auto"
        size="mini"
        :inline="true"
      >
        <el-form-item label="手机" prop="phone">
          <el-input
            placeholder="请输入你的手机号"
            type="text"
            v-model="user.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex">
            <el-input
              v-model="user.code"
              placeholder="请输入你的验证码"
            ></el-input>
            <el-button type="primary" @click="getcode" style="margin-left: 5px"
              >获取验证码</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入你的密码"
            v-model="user.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="Conpassword">
          <el-input
            type="password"
            placeholder="请输入你的确认密码"
            v-model="user.Conpassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="协议" prop="agree">
          <el-checkbox v-model="user.agree"
            >同意协议并注册《尚品汇用户协议》</el-checkbox
          >
        </el-form-item>
        <el-form-item style="margin: 10px 125px">
          <el-button type="primary" @click="register">完成注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { getcode, register } from "@/network/register";
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        const pat = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
        if (!pat.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }, 100);
    };
    var vaildateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (/^\d{6}$/.test(value)) {
          callback();
        } else {
          callback(new Error("验证码格式不正确"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (/^[0-9A-Za-z]{8,20}$/.test(value)) {
          callback();
        } else {
          callback("密码格式不正确");
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var vaildateAgree = (rule, value, callback) => {
      if (value == false) {
        callback("必须勾选同意哦");
      } else {
        return callback();
      }
    };
    return {
      user: {
        phone: "",
        code: "",
        password: "",
        Conpassword: "",
        agree: true,
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        Conpassword: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "change" }],
        code: [{ validator: vaildateCode, trigger: "change" }],
        agree: [{ validator: vaildateAgree, trigger: "change" }],
      },
    };
  },
  methods: {
    //获取验证码
    async getcode() {
      if (this.user.phone) {
        const res = await getcode(this.user.phone);
        if ((res.data.code = 200)) {
          this.user.code = res.data.data;
        }
      }
    },
    //注册
    async register() {
      this.$refs.user.validate(async (bool, obj) => {
        if (bool) {
          const res = await register(this.user);
          if (res.data.code == 200) {
            this.$router.push({ name: "login" });
          } else {
            alert(res.data.message);
          }
        } else {
          alert("信息校验失败");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      .code {
        height: 38px;
        padding: 3px;
      }
      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}

.register-container .register div[data-v-563d231b]:nth-of-type(1) {
  margin-top: 0px;
}
</style>